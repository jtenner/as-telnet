import {
  telnet_error_t,
  telnet_event_data_t,
  telnet_event_environ_t,
  telnet_event_iac_t,
  telnet_event_mssp_t,
  telnet_event_sb_t,
  telnet_event_ttype_t,
  telnet_event_type_t,
  telnet_t,
  TELNET_TELOPT_BINARY,
  TELNET_TELOPT_COMPRESS,
  TELNET_TELOPT_MSSP,
  TELNET_TELOPT_NEW_ENVIRON,
  TELNET_TELOPT_TTYPE,
} from "../index";

let out = "";

function bytesOut<T>(bytes: T): void {
  // @ts-ignore: length will be defined
  for (let i = 0; i < bytes.length; i++) {
    // @ts-ignore: accessor will be defined
    let e = bytes[i];
    out += (e >= 33 && e <= 126) || e == 0x20
      ? String.fromCharCode(<u16>e)
      : "%" + e.toString(16).toUpperCase().padStart(2, "0");
  }
}

let compatibility = new StaticArray<u8>(255);
compatibility[TELNET_TELOPT_BINARY] = 0b11;
compatibility[TELNET_TELOPT_MSSP] = 0b10;
compatibility[TELNET_TELOPT_NEW_ENVIRON] = 0b10;
compatibility[TELNET_TELOPT_TTYPE] = 0b10;

let t = new telnet_t<u8>(0, compatibility, 0);

export function reset(): void {
  out = "";
  t = new telnet_t<u8>(0, compatibility, 0);
  t.onData = (_telnet: telnet_t<u8>, ev: telnet_event_data_t): void => {
    out += "DATA: ";
    bytesOut(ev.data);
    out += "\r\n";
  };
  t.onSend = (_telnet: telnet_t<u8>, buffer: StaticArray<u8>): void => {
    out += "SEND: ";
    bytesOut(buffer);
    out += "\r\n";
  };
  t.onEnviron = (_telnet: telnet_t<u8>, ev: telnet_event_environ_t): void => {
    out += "ENVIRON: %" + ev.cmd.toString(16).toUpperCase().padStart(2, "0") + " ->\r\n";
    let values = ev.values;
    if (values) {
      for (let i = 0; i < values.length; i++) {
        let value = unchecked(values[i]);
        out += "  " + value.key;
        let strValue = value.value;
        if (strValue) {
          out += " = " + strValue;
        }
        out += "\r\n";
      }
    }
  };
  t.onIAC = (_telnet: telnet_t<u8>, ev: telnet_event_iac_t): void => {
    out += "IAC: %" + ev.cmd.toString(16).toUpperCase().padStart(2, "0");
  };
  t.onMSSP = (_telnet: telnet_t<u8>, ev: telnet_event_mssp_t): void => {
    out += "MSSP: %" + ev.type.toString(16).toUpperCase().padStart(2, "0") + "\r\n";
    let values = ev.values;
    if (values) {
      for (let i = 0; values.length; i++) {
        let value = unchecked(values[i]);
        out += "  TYPE: " + value.env_type.toString(16).toUpperCase().padStart(2, "0");
        out += " " + value.key;
        let strValue = value.value;
        if (strValue) {
          out += " = " + strValue;
        }
        out += "\r\n";
      }
    }
  };
  t.onError = (_telnet: telnet_t<u8>, err: telnet_error_t, fatal: bool, desc: string): void => {
    out += "ERR: %" + err.toString(16).toUpperCase().padStart(2, "0") + " fatal: " + fatal.toString() + " desc: " + desc;
  };
  t.onNegotiate = (_telnet: telnet_t<u8>, event_type: telnet_event_type_t, telopt: u8): void => {
    out += "NEGOTIATE: ";

    switch (event_type) {
      case telnet_event_type_t.TELNET_EV_DO: {
        out += "DO ";
        break;
      }
      case telnet_event_type_t.TELNET_EV_DONT: {
        out += "DONT ";
        break;
      }
      case telnet_event_type_t.TELNET_EV_WILL: {
        out += "WILL ";
        break;
      }
      case telnet_event_type_t.TELNET_EV_WONT: {
        out += "WONT ";
        break;
      }
    }

    out += "%" + telopt.toString(16).toUpperCase().padStart(2, "0") + "\r\n"
  };
  t.onSubnegotiate = (_telnet: telnet_t<u8>, ev: telnet_event_sb_t): void => {
    out += "SB: %" + ev.telopt.toString(16).toUpperCase().padStart(2, "0") + " ";
    bytesOut(ev.buffer);
    out += "\r\n";
  };
  t.onTTYPE = (_telnet: telnet_t<u8>, ev: telnet_event_ttype_t): void => {
    out += "TTYPE: %" + ev.ttype.toString(16).toUpperCase().padStart(2, "0");
    let name = ev.name;
    if (name) {
      out += name;
    }
    out += "\r\n";
  };
}
export function get_array_type(): u32 {
  return idof<StaticArray<u8>>();
}

export function input_bytes(buffer: StaticArray<u8>): string {
  t.recv(buffer);
  return out;
};

/*
Telnet.ready.then(() => {
  const teloptSupport = CompatibilityTable.create()
    .support(TelnetOption.BINARY, true, true)
    .support(TelnetOption.COMPRESS2, true, false)
    .support(TelnetOption.ZMP, true, false)
    .support(TelnetOption.MSSP, true, false)
    .support(TelnetOption.NEW_ENVIRON, true, false)
    .support(TelnetOption.TTYPE, true, false)
    .finish();

  inputFiles.forEach((file) => {
    const writable = createWritable();
    const contents = fs.readFileSync(file, "utf8");
    process.stdout.write(`File: ${file}\n`);
    const lines = contents
      .split(/\n/g)
      .filter(Boolean)
      .filter((line) => !line.startsWith("#"));
    const telnet = new Telnet(teloptSupport);
    const snapfile =
      path.join(path.dirname(file), path.basename(file, ".input")) + ".snap";

    telnet.on("compress", (event) =>
      writable.write(`Compression: ${event.state}\n`),
    );
    telnet.on("send", (event) => {
      writable.write(`Send: ${bytesToString(event.buffer)}\n`);
    });
    telnet.on("data", (event) => {
      writable.write(`Data: ${bytesToString(event.buffer)}\n`);
    });
    telnet.on("environ", (event) => {
      writable.write(`Environ: ${EnvironCommand[event.cmd]}\n`);
      event.values.forEach((env) => {
        writable.write(
          `  ${EnvironVarType[env.type]}: "${env.var}"${
            env.value ? ` = "${env.value}"` : ``
          }\n`,
        );
      });
    });
    telnet.on("error", (event) =>
      writable.write(
        `Error: ${TelnetEventType[event.type]} ${
          TelnetErrorCode[event.errcode]
        } ${event.msg}\n`,
      ),
    );
    telnet.on("iac", (event) =>
      writable.write(`IAC: ${TelnetCommand[event.cmd]}\n`),
    );
    telnet.on("mssp", (event) => {
      writable.write("MSSP:\n");
      event.values.forEach((env) => {
        writable.write(
          `  ${EnvironVarType[env.type]}: "${env.var}"${
            env.value ? ` = "${env.value}"` : ``
          }\n`,
        );
      });
    });
    telnet.on("negotiate", (event) =>
      writable.write(
        `Negotiate: ${TelnetEventType[event.type]} ${
          TelnetOption[event.telopt]
        }\n`,
      ),
    );
    telnet.on("sb", (event) =>
      writable.write(
        `Subnegotiation: ${TelnetOption[event.telopt]} ${bytesToString(
          event.buffer,
        )}\n`,
      ),
    );
    telnet.on("ttype", (event) =>
      writable.write(`TType: ${TTypeCommand[event.cmd]} ${event.name}\n`),
    );
    telnet.on("zmp", (event) => writable.write(`ZMP: ${event.argv}\n`));

    lines.forEach((line) => {
      const buffer = [];
      for (let i = 0; i < line.length; i++) {
        if (line[i] === "%") {
          buffer.push(parseInt(line.slice(i + 1, i + 3), 16));
          i += 2;
        } else {
          buffer.push(line.charCodeAt(i));
        }
      }
      telnet.receive(buffer);
    });

    if (createSnap) {
      fs.writeFileSync(snapfile, writable.value);
    } else {
      const snapfileContents = fs.readFileSync(snapfile, "utf8");
      if (snapfileContents !== writable.value) {
        const changes = diff.diffLines(snapfileContents, writable.value);

        for (let i = 0; i < changes.length; i++) {
          const change = changes[i];
          const lineStart = change.added
            ? "\n+ "
            : change.removed
            ? "\n- "
            : "\n  ";
          process.stdout.write(
            `${lineStart}${change.value.split("\n").join(lineStart)}`,
          );
        }
        process.stdout.write("\n");
        process.exit(1);
      } else {
        process.stdout.write(`[Success]\n\n`);
      }
    }
    telnet.dispose();
  });
});
*/