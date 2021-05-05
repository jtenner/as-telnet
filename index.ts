/// <reference path="node_modules/assemblyscript/std/assembly/rt/index.d.ts" />

export class telnet_event_t {
	public constructor(
		public type: telnet_event_type_t,
	) {}
}

export class telnet_event_zmp_t extends telnet_event_t {
	public constructor(
		public argv: string[],
	) {
		super(telnet_event_type_t.TELNET_EV_ZMP);
	}

	public get argc(): i32 {
		return this.argv.length;
	}
}

export class telnet_environ_t {
	public constructor(
		/*!< either TELNET_ENVIRON_VAR or TELNET_ENVIRON_USERVAR */
		public env_type: u8,
		/*!< name of the variable being set */
		public key: string,
		/*!< value of variable being set; empty string if no value */
		public value: string | null,
	) {}
}

export class telnet_mssp_t {
	public constructor(
		/*!< name of the variable being set */
		public key: string,
		/*!< value of variable being set */
		public value: string,
	) {}
}

export class telnet_event_data_t extends telnet_event_t {
	constructor(
		public data: StaticArray<u8>,
	) {
		super(telnet_event_type_t.TELNET_EV_DATA);
	}
}

export class telnet_event_mssp_t extends telnet_event_t {
	constructor(
		public values: Array<telnet_mssp_t> | null,
	) {
		super(telnet_event_type_t.TELNET_EV_MSSP);
	}
}

export class telnet_event_iac_t extends telnet_event_t {
	constructor(public cmd: u8) {
		super(telnet_event_type_t.TELNET_EV_IAC);
	}
}

export class telnet_event_environ_t extends telnet_event_t {
	constructor(
		public values: StaticArray<telnet_environ_t> | null,
		public cmd: u8,
	) {
		super(telnet_event_type_t.TELNET_EV_ENVIRON);
	}
}

export class telnet_event_ttype_t extends telnet_event_t {
	constructor(
		public ttype: u8,
		public name: string | null,
	) {
		super(telnet_event_type_t.TELNET_EV_TTYPE)
	}
}

export class telnet_event_sb_t extends telnet_event_t {
	constructor(
		public telopt: u8,
		public buffer: StaticArray<u8>,
	) {
		super(telnet_event_type_t.TELNET_EV_SUBNEGOTIATION);
	}
}

export const enum telnet_state_t {
	TELNET_STATE_DATA,
	TELNET_STATE_EOL,
	TELNET_STATE_IAC,
	TELNET_STATE_WILL,
	TELNET_STATE_WONT,
	TELNET_STATE_DO,
	TELNET_STATE_DONT,
	TELNET_STATE_SB,
	TELNET_STATE_SB_DATA,
	TELNET_STATE_SB_DATA_IAC
}

export const enum Q {
	NO = 0,
  YES = 1,
  WANTNO = 2,
  WANTYES = 3,
  WANTNO_OP = 4,
  WANTYES_OP = 5
}

@inline export const Q_NO: u8 = 0;
@inline export const Q_YES: u8 = 1;
@inline export const Q_WANTNO: u8 = 2;
@inline export const Q_WANTYES: u8 = 3;
@inline export const Q_WANTNO_OP: u8 = 4;
@inline export const Q_WANTYES_OP: u8 = 5;

@inline function Q_US(q: u8): u8 { return q & 0x0f; }
@inline function Q_HIM(q: u8): u8 { return (q & 0xf0) >> 4; }
@inline function Q_MAKE(us: u8, him: u8): u8 { return (us) | ((him) << 4); }

@inline const TELNET_SUPPORT_LOCAL: u8 = (1 << 1);
@inline const TELNET_SUPPORT_REMOTE: u8 = (1 << 0);

@inline export const TELNET_IAC: u8 = 255;
@inline export const TELNET_DONT: u8 = 254;
@inline export const TELNET_DO: u8 = 253;
@inline export const TELNET_WONT: u8 = 252;
@inline export const TELNET_WILL: u8 = 251;
@inline export const TELNET_SB: u8 = 250;
@inline export const TELNET_GA: u8 = 249;
@inline export const TELNET_EL: u8 = 248;
@inline export const TELNET_EC: u8 = 247;
@inline export const TELNET_AYT: u8 = 246;
@inline export const TELNET_AO: u8 = 245;
@inline export const TELNET_IP: u8 = 244;
@inline export const TELNET_BREAK: u8 = 243;
@inline export const TELNET_DM: u8 = 242;
@inline export const TELNET_NOP: u8 = 241;
@inline export const TELNET_SE: u8 = 240;
@inline export const TELNET_EOR: u8 = 239;
@inline export const TELNET_ABORT: u8 = 238;
@inline export const TELNET_SUSP: u8 = 237;
@inline export const TELNET_EOF: u8 = 236;

@inline export const TELNET_TELOPT_BINARY: u8 = 0;
@inline export const TELNET_TELOPT_ECHO: u8 = 1;
@inline export const TELNET_TELOPT_RCP: u8 = 2;
@inline export const TELNET_TELOPT_SGA: u8 = 3;
@inline export const TELNET_TELOPT_NAMS: u8 = 4;
@inline export const TELNET_TELOPT_STATUS: u8 = 5;
@inline export const TELNET_TELOPT_TM: u8 = 6;
@inline export const TELNET_TELOPT_RCTE: u8 = 7;
@inline export const TELNET_TELOPT_NAOL: u8 = 8;
@inline export const TELNET_TELOPT_NAOP: u8 = 9;
@inline export const TELNET_TELOPT_NAOCRD: u8 = 10;
@inline export const TELNET_TELOPT_NAOHTS: u8 = 11;
@inline export const TELNET_TELOPT_NAOHTD: u8 = 12;
@inline export const TELNET_TELOPT_NAOFFD: u8 = 13;
@inline export const TELNET_TELOPT_NAOVTS: u8 = 14;
@inline export const TELNET_TELOPT_NAOVTD: u8 = 15;
@inline export const TELNET_TELOPT_NAOLFD: u8 = 16;
@inline export const TELNET_TELOPT_XASCII: u8 = 17;
@inline export const TELNET_TELOPT_LOGOUT: u8 = 18;
@inline export const TELNET_TELOPT_BM: u8 = 19;
@inline export const TELNET_TELOPT_DET: u8 = 20;
@inline export const TELNET_TELOPT_SUPDUP: u8 = 21;
@inline export const TELNET_TELOPT_SUPDUPOUTPUT: u8 = 22;
@inline export const TELNET_TELOPT_SNDLOC: u8 = 23;
@inline export const TELNET_TELOPT_TTYPE: u8 = 24;
@inline export const TELNET_TELOPT_EOR: u8 = 25;
@inline export const TELNET_TELOPT_TUID: u8 = 26;
@inline export const TELNET_TELOPT_OUTMRK: u8 = 27;
@inline export const TELNET_TELOPT_TTYLOC: u8 = 28;
@inline export const TELNET_TELOPT_3270REGIME: u8 = 29;
@inline export const TELNET_TELOPT_X3PAD: u8 = 30;
@inline export const TELNET_TELOPT_NAWS: u8 = 31;
@inline export const TELNET_TELOPT_TSPEED: u8 = 32;
@inline export const TELNET_TELOPT_LFLOW: u8 = 33;
@inline export const TELNET_TELOPT_LINEMODE: u8 = 34;
@inline export const TELNET_TELOPT_XDISPLOC: u8 = 35;
@inline export const TELNET_TELOPT_ENVIRON: u8 = 36;
@inline export const TELNET_TELOPT_AUTHENTICATION: u8 = 37;
@inline export const TELNET_TELOPT_ENCRYPT: u8 = 38;
@inline export const TELNET_TELOPT_NEW_ENVIRON: u8 = 39;
@inline export const TELNET_TELOPT_MSSP: u8 = 70;
@inline export const TELNET_TELOPT_COMPRESS: u8 = 85;
@inline export const TELNET_TELOPT_COMPRESS2: u8 = 86;
@inline export const TELNET_TELOPT_ZMP: u8 = 93;
@inline export const TELNET_TELOPT_EXOPL: u8 = 255;
@inline export const TELNET_TELOPT_MCCP2: u8 = 86;

/*! \name Protocol codes for TERMINAL-TYPE commands. */
/*@{*/
/*! TERMINAL-TYPE codes. */
@inline export const TELNET_TTYPE_IS: u8 = 0;
@inline export const TELNET_TTYPE_SEND: u8 = 1;
/*@}*/

/*! \name Protocol codes for NEW-ENVIRON/ENVIRON commands. */
/*@{*/
/*! NEW-ENVIRON/ENVIRON codes. */
@inline export const TELNET_ENVIRON_IS: u8 = 0;
@inline export const TELNET_ENVIRON_SEND: u8 = 1;
@inline export const TELNET_ENVIRON_INFO: u8 = 2;
@inline export const TELNET_ENVIRON_VAR: u8 = 0;
@inline export const TELNET_ENVIRON_VALUE: u8 = 1;
@inline export const TELNET_ENVIRON_ESC: u8 = 2;
@inline export const TELNET_ENVIRON_USERVAR: u8 = 3;
/*@}*/

/*! \name Protocol codes for MSSP commands. */
/*@{*/
/*! MSSP codes. */
@inline export const TELNET_MSSP_VAR: u8 = 1;
@inline export const TELNET_MSSP_VAL: u8 = 2;
/*@}*/

/*! \name Telnet state tracker flags. */
/*@{*/
/*! Control behavior of telnet state tracker. */
@inline export const TELNET_FLAG_PROXY: u8 = (1<<0);
@inline export const TELNET_FLAG_NVT_EOL: u8 = (1<<1);

/* Internal-only bits in option flags */
@inline export const TELNET_FLAG_TRANSMIT_BINARY: u8 = (1<<5);
@inline export const TELNET_FLAG_RECEIVE_BINARY: u8 = (1<<6);
@inline export const TELNET_PFLAG_DEFLATE: u8 = (1<<7);

export const enum telnet_event_type_t {
	TELNET_EV_DATA = 0,        /*!< raw text data has been received */
	TELNET_EV_SEND,            /*!< data needs to be sent to the peer */
	TELNET_EV_IAC,             /*!< generic IAC code received */
	TELNET_EV_WILL,            /*!< WILL option negotiation received */
	TELNET_EV_WONT,            /*!< WONT option neogitation received */
	TELNET_EV_DO,              /*!< DO option negotiation received */
	TELNET_EV_DONT,            /*!< DONT option negotiation received */
	TELNET_EV_SUBNEGOTIATION,  /*!< sub-negotiation data received */
	TELNET_EV_COMPRESS,        /*!< compression has been enabled */
	TELNET_EV_ZMP,             /*!< ZMP command has been received */
	TELNET_EV_TTYPE,           /*!< TTYPE command has been received */
	TELNET_EV_ENVIRON,         /*!< ENVIRON command has been received */
	TELNET_EV_MSSP,            /*!< MSSP command has been received */
	TELNET_EV_WARNING,         /*!< recoverable error has occured */
	TELNET_EV_ERROR            /*!< non-recoverable error has occured */
};

/*!
 * error codes
 */
export const enum telnet_error_t {
	TELNET_EOK = 0,   /*!< no error */
	TELNET_EBADVAL,   /*!< invalid parameter, or API misuse */
	TELNET_ENOMEM,    /*!< memory allocation failure */
	TELNET_EOVERFLOW, /*!< data exceeds buffer size */
	TELNET_EPROTOCOL, /*!< invalid sequence of special bytes */
	TELNET_ECOMPRESS  /*!< error handling compressed streams */
};

function scan_until_next_environ_var(buffer: StaticArray<u8>, i: i32): i32 {
	let length = buffer.length;
	while (i < length) {
		let c = unchecked(buffer[i]);
		if (c == TELNET_ENVIRON_VAR ||
				c == TELNET_ENVIRON_VALUE ||
				c == TELNET_ENVIRON_USERVAR) {
			break;
		}
		if (c == TELNET_ENVIRON_ESC) i++;
		i++;
	}
	return i;
}

export class telnet_t<T> {
	/* telopt support table */
  telopts: StaticArray<u8>;

	/* RFC1143 option negotiation states packed into a single byte per option. */
  q: StaticArray<u8> = new StaticArray<u8>(256);

	/* sub-request buffer */
	buffer: StaticArray<u8> = new StaticArray<u8>(u16.MAX_VALUE);

	/* current buffer write position (also length of buffer data) */
	buffer_pos: i32 = 0;

	/* current state */
	state: telnet_state_t = 0;

	/* option flags */
	flags: u8;

	/* current subnegotiation telopt */
	sb_telopt: u8 = 0;

	/** Since assemblyscript has no closure, sometimes, it's useful to keep a generic T that identifies a socket associated with this telnet instance. */
	data: T;

	constructor(data: T, support: StaticArray<u8>, flags: u8) {
		this.data = data;
		this.telopts = support;
		this.flags = flags;
	}

	/** send callback */
	onSend: ((telnet: telnet_t<T>, buffer: StaticArray<u8>) => void) | null;

	/** error callback */
	onError: ((telnet: telnet_t<T>, error: telnet_error_t, fatal: bool, desc: string) => void) | null;

	/** negotiate callback */
	onNegotiate: ((telnet: telnet_t<T>, event_type: telnet_event_type_t, telopt: u8) => void) | null;

	/** environ callback */
	onEnviron: ((telnet: telnet_t<T>, ev: telnet_event_environ_t) => void) | null;

	/** mssp callback */
	onMSSP: ((telnet: telnet_t<T>, ev: telnet_event_mssp_t) => void) | null;

	/** ttype callback */
	onTTYPE: ((telnet: telnet_t<T>, ev: telnet_event_ttype_t) => void) | null;

	/** subnegotiate callback */
	onSubnegotiate: ((telnet: telnet_t<T>, ev: telnet_event_sb_t) => void) | null;

	/** data callback */
	onData: ((telnet: telnet_t<T>, ev: telnet_event_data_t) => void) | null;

	/** iac callback */
	onIAC: ((telnet: telnet_t<T>, ev: telnet_event_iac_t) => void) | null;

	/** zmp callback */
	onZMP: ((telnet: telnet_t<T>, ev: telnet_event_zmp_t) => void) | null;

	private set_rfc1143(telopt: u8, us: u8, him: u8): void {
		unchecked(this.q[telopt] = Q_MAKE(us,him));

		if (telopt != TELNET_TELOPT_BINARY)
			return;
		this.flags &= ~(TELNET_FLAG_TRANSMIT_BINARY |
						TELNET_FLAG_RECEIVE_BINARY);
		if (us == Q_YES)
			this.flags |= TELNET_FLAG_TRANSMIT_BINARY;
		if (him == Q_YES)
			this.flags |= TELNET_FLAG_RECEIVE_BINARY;
	}

	private check_telopt_us(option: u8): u8 {
		return unchecked(this.telopts[option]) & TELNET_SUPPORT_LOCAL;
	}

	private check_telopt_him(option: u8): u8 {
		return unchecked(this.telopts[option]) & TELNET_SUPPORT_REMOTE;
	}

	private send_negotiate(cmd: u8, telopt: u8): void {
		let onSend = this.onSend;
		if (onSend) {
			onSend(this, [TELNET_IAC, cmd, telopt]);
		}
	}

	private negotiate_telopt(telopt: u8): void {
		if (this.flags & TELNET_FLAG_PROXY) {
			let onNegotiate = this.onNegotiate;
			if (onNegotiate) {

				switch (this.state) {
					case telnet_state_t.TELNET_STATE_WILL:
						onNegotiate(this, telnet_event_type_t.TELNET_EV_WILL, telopt);
						break;
					case telnet_state_t.TELNET_STATE_WONT:
						onNegotiate(this, telnet_event_type_t.TELNET_EV_WONT, telopt);
						break;
					case telnet_state_t.TELNET_STATE_DO:
						onNegotiate(this, telnet_event_type_t.TELNET_EV_DO, telopt);
						break;
					case telnet_state_t.TELNET_STATE_DONT:
						onNegotiate(this, telnet_event_type_t.TELNET_EV_DONT, telopt);
						break;
					}
			}
			return;
		}

		/* lookup the current state of the option */
		let q = this.q[telopt];
		let onNegotiate = this.onNegotiate;
		let onError = this.onError;
		switch (this.state) {
			/* request to enable option on remote end or confirm DO */
			case telnet_state_t.TELNET_STATE_WILL:
				switch (Q_HIM(q)) {
				case Q_NO:
					if (this.check_telopt_him(telopt)) {
						this.set_rfc1143(telopt, Q_US(q), Q_YES);
						this.send_negotiate(TELNET_DO, telopt);
						if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_WILL, telopt);
					} else{
						this.send_negotiate(TELNET_DONT, telopt);
					}
					break;
				case Q_WANTNO:
					this.set_rfc1143(telopt, Q_US(q), Q_NO);
					if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_WONT, telopt);
					if (onError) onError(this, telnet_error_t.TELNET_EPROTOCOL, false, "DONT answered by WILL");
					break;
				case Q_WANTNO_OP:
					this.set_rfc1143(telopt, Q_US(q), Q_YES);
					if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_WILL, telopt);
					if (onError) onError(this, telnet_error_t.TELNET_EPROTOCOL, false, "DONT answered by WILL");
					break;
				case Q_WANTYES:
					this.set_rfc1143(telopt, Q_US(q), Q_YES);
					if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_WILL, telopt);
					break;
				case Q_WANTYES_OP:
					this.set_rfc1143(telopt, Q_US(q), Q_WANTNO);
					this.send_negotiate(TELNET_DONT, telopt);
					if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_WILL, telopt);
					break;
				}
				break;

			/* request to disable option on remote end, confirm DONT, reject DO */
			case telnet_state_t.TELNET_STATE_WONT:
				switch (Q_HIM(q)) {
				case Q_YES:
					this.set_rfc1143(telopt, Q_US(q), Q_NO);
					this.send_negotiate(TELNET_DONT, telopt);
					if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_WONT, telopt);
					break;
				case Q_WANTNO:
					this.set_rfc1143(telopt, Q_US(q), Q_NO);
					if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_WONT, telopt);
					break;
				case Q_WANTNO_OP:
					this.set_rfc1143(telopt, Q_US(q), Q_WANTYES);
					if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_DO, telopt);
					break;
				case Q_WANTYES:
				case Q_WANTYES_OP:
					this.set_rfc1143(telopt, Q_US(q), Q_NO);
					break;
				}
				break;

			/* request to enable option on local end or confirm WILL */
			case telnet_state_t.TELNET_STATE_DO:
				switch (Q_US(q)) {
				case Q_NO:
					if (this.check_telopt_us(telopt)) {
						this.set_rfc1143(telopt, Q_YES, Q_HIM(q));
						this.send_negotiate(TELNET_WILL, telopt);
						if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_DO, telopt);
					} else
						this.send_negotiate(TELNET_WONT, telopt);
					break;
				case Q_WANTNO:
					this.set_rfc1143(telopt, Q_NO, Q_HIM(q));
					if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_DONT, telopt);
					if (onError) onError(this, telnet_error_t.TELNET_EPROTOCOL, false, "WONT answered by DO");
					break;
				case Q_WANTNO_OP:
					this.set_rfc1143(telopt, Q_YES, Q_HIM(q));
					if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_DO, telopt);
					if (onError) onError(this, telnet_error_t.TELNET_EPROTOCOL, false, "WONT answered by DO");
					break;
				case Q_WANTYES:
					this.set_rfc1143(telopt, Q_YES, Q_HIM(q));
					if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_DO, telopt);
					break;
				case Q_WANTYES_OP:
					this.set_rfc1143(telopt, Q_WANTNO, Q_HIM(q));
					this.send_negotiate(TELNET_WONT, telopt);
					if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_DO, telopt);
					break;
				}
				break;

			/* request to disable option on local end, confirm WONT, reject WILL */
			case telnet_state_t.TELNET_STATE_DONT:
				switch (Q_US(q)) {
				case Q_YES:
					this.set_rfc1143(telopt, Q_NO, Q_HIM(q));
					this.send_negotiate(TELNET_WONT, telopt);
					if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_DONT, telopt);
					break;
				case Q_WANTNO:
					this.set_rfc1143(telopt, Q_NO, Q_HIM(q));
					if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_WONT, telopt);
					break;
				case Q_WANTNO_OP:
					this.set_rfc1143(telopt, Q_WANTYES, Q_HIM(q));
					this.send_negotiate(TELNET_WILL, telopt);
					if (onNegotiate) onNegotiate(this, telnet_event_type_t.TELNET_EV_WILL, telopt);
					break;
				case Q_WANTYES:
				case Q_WANTYES_OP:
					this.set_rfc1143(telopt, Q_NO, Q_HIM(q));
					break;
				}
				break;
			}
	}

	/* parse ZMP command subnegotiation buffers */
	private zmp_telnet(buffer: StaticArray<u8>, size: i32): i32 {
		let argv: string[] = [];

		/* make sure this is a valid ZMP buffer */
		if (size == 0 || buffer[size - 1] != 0) {
			let onError = this.onError;
			if (onError) onError(this, telnet_error_t.TELNET_EPROTOCOL, false, "incomplete ZMP frame");
			return 0;
		}

		let start = 0;
		for (let i = 0; i < size; i++) {
			if (unchecked(buffer[i] == 0)) {
				let str = String.UTF8.decodeUnsafe(
					changetype<usize>(buffer) + <usize>start,
					<usize>(i - start + 1),
					true,
				);
				argv.push(str);
				start = i + 1;
			}
		}

		let ev = new telnet_event_zmp_t(argv);
		let onZMP = this.onZMP;
		if (onZMP) onZMP(this, ev);

		return 0;
	}

	private environ_telnet(environType: u8, buffer: StaticArray<u8>, size: i32): i32 {
			let ev: telnet_event_environ_t;
			let values: StaticArray<telnet_environ_t>;
			let count: usize;

			/* if we have no data, just pass it through */
			if (size == 0) {
				return 0;
			}

			/* first byte must be a valid command */
			if (unchecked(buffer[0]) != TELNET_ENVIRON_SEND &&
					unchecked(buffer[0]) != TELNET_ENVIRON_IS &&
					unchecked(buffer[0]) != TELNET_ENVIRON_INFO) {
						let onError = this.onError;
						if (onError) onError(this, telnet_error_t.TELNET_EPROTOCOL, false, "telopt " + environType.toString() + " subneg has invalid command");
				return 0;
			}
			ev = new telnet_event_environ_t(
				null,
				/* store ENVIRON command */
				buffer[0],
			);

			/* if we have no arguments, send an event with no data end return */
			if (size == 1) {
				/* no list of variables given, invoke event with our arguments */
				ev.type = telnet_event_type_t.TELNET_EV_ENVIRON;
				let onEnviron = this.onEnviron;
				if (onEnviron) onEnviron(this, ev);
				return 1;
			}

			/* very second byte must be VAR or USERVAR, if present */
			if (unchecked(buffer[1]) != TELNET_ENVIRON_VAR &&
					unchecked(buffer[1]) != TELNET_ENVIRON_USERVAR) {
						let onError = this.onError;
						if (onError) onError(this, telnet_error_t.TELNET_EPROTOCOL, false, "telopt " + environType.toString() + " subneg missing variable type");
				return 0;
			}

			/* ensure last byte is not an escape byte (makes parsing later easier) */
			if (unchecked(buffer[size - 1]) == TELNET_ENVIRON_ESC) {
				let onError = this.onError;
				if (onError) onError(this, telnet_error_t.TELNET_EPROTOCOL, false, "telopt " + environType.toString() + " subneg ends with ESC");
				return 0;
			}

			/* count arguments; each valid entry starts with VAR or USERVAR */
			count = 0;

			for (let i = 1; i < size; i++) {
				let c = unchecked(buffer[i]);
				if (c == TELNET_ENVIRON_VAR || c == TELNET_ENVIRON_USERVAR) {
					++count;
				} else if (c == TELNET_ENVIRON_ESC) {
					/* skip the next byte */
					++c;
				}
			}

			ev.values = values = new StaticArray<telnet_environ_t>(<i32>count);

			/* parse argument array strings */
			// i indexes the buffer
			for (let index = 0, i = 1; index != <i32>count; ++index) {
				let c = unchecked(buffer[i++]);
				let nameStart = i;
				// not inclusive
				let nameEnd = scan_until_next_environ_var(buffer, i);
				let value: string | null = null;
				if (nameEnd < size && unchecked(buffer[nameEnd]) == TELNET_ENVIRON_VALUE) {
					// parse a value
					let valueStart = nameEnd + 1;
					let valueEnd = scan_until_next_environ_var(buffer, valueStart);
					value = String.UTF8.decodeUnsafe(
						changetype<usize>(buffer) + <usize>valueStart,
						<usize>(valueEnd - valueStart),
						false,
					);
					i = valueEnd;
				} else {
					i = nameEnd;
				}
				values[index] = new telnet_environ_t(
					c,
					String.UTF8.decodeUnsafe(
						changetype<usize>(buffer) + <usize>nameStart,
						<usize>(nameEnd - nameStart),
						false,
					),
					value
				);
			}

			let onEnviron = this.onEnviron;
			if (onEnviron) onEnviron(this, ev);
			return 1;
	}

	private mssp_telnet(buffer: StaticArray<u8>, size: i32): i32 {
		// telnet_event_t ev;
		// struct telnet_environ_t *values;
		// char *var = 0;
		// char *c, *last, *out;
		// size_t i, count;
		// unsigned char next_type;

		let values = new Array<telnet_mssp_t>();
		let i = 0;
		let c = unchecked(buffer[i++]);
		if (c != TELNET_MSSP_VAR) {
			let onError = this.onError;
			if (onError) onError(this, telnet_error_t.TELNET_EPROTOCOL, false, "MSSP subnegotiation has invalid data");
			return 0;
		}

		let state = TELNET_MSSP_VAR;
		let key: string = "";
		let start = 1;
		for (;i < size; i++) {
			let c = unchecked(buffer[i]);
			if (c == state) {
				let onError = this.onError;
				if (onError) onError(this, telnet_error_t.TELNET_EPROTOCOL, false, "MSSP subnegotiation has invalid data");
				return 0;
			}

			if (c == TELNET_MSSP_VAR) {
				let val = String.UTF8.decodeUnsafe(
					changetype<usize>(buffer) + <usize>start,
					i - start,
					false,
				);
				let mssp = new telnet_mssp_t(key, val);
				start = i + 1;
				values.push(mssp);
				state = TELNET_MSSP_VAR;
			} else if (c == TELNET_MSSP_VAL) {
				key = String.UTF8.decodeUnsafe(
					changetype<usize>(buffer) + <usize>start,
					i - start,
					false,
				);
				state = TELNET_MSSP_VAL;
				start = i + 1;
			}
		}

		if (state == TELNET_MSSP_VAR) {
			let onError = this.onError;
			if (onError) onError(this, telnet_error_t.TELNET_EPROTOCOL, false, "MSSP subnegotiation has invalid data");
			return 0;
		}

		let val = String.UTF8.decodeUnsafe(
			changetype<usize>(buffer) + <usize>start,
			i - start,
			false,
		);
		let mssp = new telnet_mssp_t(key, val);
		values.push(mssp);

		let onMSSP = this.onMSSP;
		let ev = new telnet_event_mssp_t(values);
		if (onMSSP) onMSSP(this, ev);
		return 0;
	}

	/* parse TERMINAL-TYPE command subnegotiation buffers */
	private ttype_telnet(buffer: StaticArray<u8>, size: i32): i32 {
		/* make sure request is not empty */
		if (size == 0) {
			let onError = this.onError;
			if (onError) onError(this, telnet_error_t.TELNET_EPROTOCOL, false, "incomplete TERMINAL-TYPE request");
			return 0;
		}
		let c = unchecked(buffer[0]);
		/* make sure request has valid command type */
		if (c != TELNET_TTYPE_IS &&
				c != TELNET_TTYPE_SEND) {
			let onError = this.onError;
			if (onError) onError(this, telnet_error_t.TELNET_EPROTOCOL, false, "TERMINAL-TYPE request has invalid type");
			return 0;
		}

		let ev: telnet_event_ttype_t;
		/* send proper event */
		if (c == TELNET_TTYPE_IS) {
			let name: string = String.UTF8.decodeUnsafe(
				changetype<usize>(buffer) + 1,
				<usize>(size - 1)
			);
			ev = new telnet_event_ttype_t(
				TELNET_TTYPE_IS,
				name,
			);
		} else {
			ev = new telnet_event_ttype_t(
				TELNET_TTYPE_SEND,
				null,
			);
		}
		let onTTYPE = this.onTTYPE;
		if (onTTYPE) onTTYPE(this, ev);
		return 0;
	}

	private subnegotiate(): i32 {
		let ev: telnet_event_sb_t = new telnet_event_sb_t(
			this.sb_telopt,
			StaticArray.slice(this.buffer, 0, this.buffer_pos),
		);
		let onSubnegotiate = this.onSubnegotiate;
		if (onSubnegotiate) onSubnegotiate(this, ev);

		switch (this.sb_telopt) {
			case TELNET_TELOPT_ZMP:
			 	return this.zmp_telnet(this.buffer, this.buffer_pos);
			case TELNET_TELOPT_TTYPE:
				return this.ttype_telnet(this.buffer, this.buffer_pos);
			case TELNET_TELOPT_ENVIRON:
			case TELNET_TELOPT_NEW_ENVIRON:
				return this.environ_telnet(this.sb_telopt, this.buffer, this.buffer_pos);
			case TELNET_TELOPT_MSSP:
				return this.mssp_telnet(this.buffer, this.buffer_pos);
			default: return 0;
		}
	}

	private buffer_byte(byte: u8): telnet_error_t {
		let buffer = this.buffer;
		let buffer_pos = this.buffer_pos;
		let buffer_size = buffer.length;
		/* check if we're out of room */

		if (buffer_pos == buffer_size) {
			let new_size = <usize>(buffer_size << 1);
			buffer = changetype<StaticArray<u8>>(__renew(changetype<usize>(buffer), new_size));
			// memory.fill(changetype<usize>(buffer) + <usize>buffer_size, 0, <usize>(new_size - buffer_size));
			this.buffer = buffer;
		}

		/* push the byte, all set */
		unchecked(buffer[buffer_pos] = byte);
		this.buffer_pos = buffer_pos + 1;
		return telnet_error_t.TELNET_EOK;
	}

	private process(buffer: StaticArray<u8>): void {
		// telnet_event_t ev;
		// unsigned char byte;
		// size_t i, start;
		let byte: u8;
		let i: i32;
		let start: i32;
		let size = buffer.length;

		for (i = start = 0; i != size; ++i) {
			byte = buffer[i];
			switch (this.state) {
			/* regular data */
			case telnet_state_t.TELNET_STATE_DATA:
				/* on an IAC byte, pass through all pending bytes and
				 * switch states */
				if (byte == TELNET_IAC) {
					if (i != start) {
						let ev = new telnet_event_data_t(StaticArray.slice(buffer, start, i - start));
						let onData = this.onData;
						if (onData) onData(this, ev);
					}
					this.state = telnet_state_t.TELNET_STATE_IAC;
				} else if (byte == <u8>('\r'.charCodeAt(0)) &&
							 (this.flags & TELNET_FLAG_NVT_EOL) &&
							 !(this.flags & TELNET_FLAG_RECEIVE_BINARY)) {
					if (i != start) {
						let ev = new telnet_event_data_t(StaticArray.slice(buffer, start, i - start));
						let onData = this.onData;
						if (onData) onData(this, ev);
					}
					this.state = telnet_state_t.TELNET_STATE_EOL;
				}
				break;

			/* NVT EOL to be translated */
			case telnet_state_t.TELNET_STATE_EOL:
				if (byte != '\n'.charCodeAt(0)) {

					let ev = new telnet_event_data_t([<u8>'\r'.charCodeAt(0)]);
					let onData = this.onData;
					if (onData) onData(this, ev);
					byte = buffer[i];
				}
				/* any byte following '\r' other than '\n' or '\0' is invalid,
				 * so pass both \r and the byte */
				start = i;
				if (byte == '\0'.charCodeAt(0))
					++start;
				/* state update */
				this.state = telnet_state_t.TELNET_STATE_DATA;
				break;
	
			/* IAC command */
			case telnet_state_t.TELNET_STATE_IAC:
				switch (byte) {
				/* subnegotiation */
				case TELNET_SB:
					this.state = telnet_state_t.TELNET_STATE_SB;
					break;
				/* negotiation commands */
				case TELNET_WILL:
					this.state = telnet_state_t.TELNET_STATE_WILL;
					break;
				case TELNET_WONT:
					this.state = telnet_state_t.TELNET_STATE_WONT;
					break;
				case TELNET_DO:
					this.state = telnet_state_t.TELNET_STATE_DO;
					break;
				case TELNET_DONT:
					this.state = telnet_state_t.TELNET_STATE_DONT;
					break;
				/* IAC escaping */
				case TELNET_IAC: {
					/* event */
					let ev = new telnet_event_data_t([byte]);
					let onData = this.onData;
					if (onData) onData(this, ev);

					/* state update */
					start = i + 1;
					this.state = telnet_state_t.TELNET_STATE_DATA;
					break;
				}
				/* some other command */
				default: {
					/* event */
					let ev = new telnet_event_iac_t(byte);
					let onIAC = this.onIAC;
					if (onIAC) onIAC(this, ev);

					/* state update */
					start = i + 1;
					this.state = telnet_state_t.TELNET_STATE_DATA;
				}

				}
				break;
	
			/* negotiation commands */
			case telnet_state_t.TELNET_STATE_WILL:
			case telnet_state_t.TELNET_STATE_WONT:
			case telnet_state_t.TELNET_STATE_DO:
			case telnet_state_t.TELNET_STATE_DONT:
				this.negotiate_telopt(byte);
				start = i + 1;
				this.state = telnet_state_t.TELNET_STATE_DATA;
				break;
	
			/* subnegotiation -- determine subnegotiation telopt */
			case telnet_state_t.TELNET_STATE_SB:
				this.sb_telopt = byte;
				this.buffer_pos = 0;
				this.state = telnet_state_t.TELNET_STATE_SB_DATA;
				break;
	
			/* subnegotiation -- buffer bytes until end request */
			case telnet_state_t.TELNET_STATE_SB_DATA:
				/* IAC command in subnegotiation -- either IAC SE or IAC IAC */
				if (byte == TELNET_IAC) {
					this.state = telnet_state_t.TELNET_STATE_SB_DATA_IAC;
				} else if (this.sb_telopt == TELNET_TELOPT_COMPRESS && byte == TELNET_WILL) {
					/* In 1998 MCCP used TELOPT 85 and the protocol defined an invalid
					 * subnegotiation sequence (IAC SB 85 WILL SE) to start compression.
					 * Subsequently MCCP version 2 was created in 2000 using TELOPT 86
					 * and a valid subnegotiation (IAC SB 86 IAC SE). libtelnet for now
					 * just captures and discards MCCPv1 sequences.
					 */
					start = i + 2;
					this.state = telnet_state_t.TELNET_STATE_DATA;
				/* buffer the byte, or bail if we can't */
				} else if (this.buffer_byte(byte) != telnet_error_t.TELNET_EOK) {
					start = i + 1;
					this.state = telnet_state_t.TELNET_STATE_DATA;
				}
				break;
	
			/* IAC escaping inside a subnegotiation */
			case telnet_state_t.TELNET_STATE_SB_DATA_IAC:
				switch (byte) {
				/* end subnegotiation */
				case TELNET_SE:
					/* return to default state */
					start = i + 1;
					this.state = telnet_state_t.TELNET_STATE_DATA;

					/* process subnegotiation */
					if (this.subnegotiate() != 0) {
						/* any remaining bytes in the buffer are compressed.
						 * we have to re-invoke telnet_recv to get those
						 * bytes inflated and abort trying to process the
						 * remaining compressed bytes in the current _process
						 * buffer argument
						 */
						this.recv(StaticArray.slice(buffer, start));
						return;
					}
					break;
				/* escaped IAC byte */
				case TELNET_IAC:
					/* push IAC into buffer */
					if (this.buffer_byte(TELNET_IAC) != telnet_error_t.TELNET_EOK) {
						start = i + 1;
						this.state = telnet_state_t.TELNET_STATE_DATA;
					} else {
						this.state = telnet_state_t.TELNET_STATE_SB_DATA;
					}
					break;
				/* something else -- protocol error.  attempt to process
				 * content in subnegotiation buffer, then evaluate the
				 * given command as an IAC code.
				 */
				default:
					let onError = this.onError;
					if (onError) onError(this, telnet_error_t.TELNET_EPROTOCOL, false,
						"unexpected byte after IAC inside SB: " + byte.toString()
					);

					/* enter IAC state */
					start = i + 1;
					this.state = telnet_state_t.TELNET_STATE_IAC;
					/* process subnegotiation; see comment in
					 * TELNET_STATE_SB_DATA_IAC about invoking telnet_recv()
					 */
					if (this.subnegotiate() != 0) {
						this.recv(StaticArray.slice(buffer, start));
						return;
					} else {
						/* recursive call to get the current input byte processed
						 * as a regular IAC command.  we could use a goto, but
						 * that would be gross.
						 */
						this.process([byte]);
					}
					break;
				}
				break;
			}
		}

		/* pass through any remaining bytes */
		if (this.state == telnet_state_t.TELNET_STATE_DATA && i != start) {
			let ev = new telnet_event_data_t(StaticArray.slice(buffer, start, i - start));
			let onData = this.onData;
			if (onData) onData(this, ev);
		}
	}

	public recv(buffer: StaticArray<u8>): void {
		this.process(buffer);
	}

	public iac(cmd: u8): void {
		let onSend = this.onSend;
		if (onSend) onSend(this, [TELNET_IAC, cmd]);
	}

	public negotiate(cmd: u8, telopt: u8): void {
		if (this.flags & TELNET_FLAG_PROXY) {
			let onSend = this.onSend;
			if (onSend) onSend(this, [TELNET_IAC, cmd, telopt]);
			return;
		}

		/* get current option states */
		let q = this.q[telopt];

		switch (cmd) {
		/* advertise willingess to support an option */
		case TELNET_WILL:
			switch (Q_US(q)) {
			case Q_NO:
				this.set_rfc1143(telopt, Q_WANTYES, Q_HIM(q));
				this.send_negotiate(TELNET_WILL, telopt);
				break;
			case Q_WANTNO:
				this.set_rfc1143(telopt, Q_WANTNO_OP, Q_HIM(q));
				break;
			case Q_WANTYES_OP:
				this.set_rfc1143(telopt, Q_WANTYES, Q_HIM(q));
				break;
			}
			break;

		/* force turn-off of locally enabled option */
		case TELNET_WONT:
			switch (Q_US(q)) {
			case Q_YES:
				this.set_rfc1143(telopt, Q_WANTNO, Q_HIM(q));
				this.send_negotiate(TELNET_WONT, telopt);
				break;
			case Q_WANTYES:
				this.set_rfc1143(telopt, Q_WANTYES_OP, Q_HIM(q));
				break;
			case Q_WANTNO_OP:
				this.set_rfc1143(telopt, Q_WANTNO, Q_HIM(q));
				break;
			}
			break;

		/* ask remote end to enable an option */
		case TELNET_DO:
			switch (Q_HIM(q)) {
			case Q_NO:
				this.set_rfc1143(telopt, Q_US(q), Q_WANTYES);
				this.send_negotiate(TELNET_DO, telopt);
				break;
			case Q_WANTNO:
				this.set_rfc1143(telopt, Q_US(q), Q_WANTNO_OP);
				break;
			case Q_WANTYES_OP:
				this.set_rfc1143(telopt, Q_US(q), Q_WANTYES);
				break;
			}
			break;

		/* demand remote end disable an option */
		case TELNET_DONT:
			switch (Q_HIM(q)) {
			case Q_YES:
				this.set_rfc1143(telopt, Q_US(q), Q_WANTNO);
				this.send_negotiate(TELNET_DONT, telopt);
				break;
			case Q_WANTYES:
				this.set_rfc1143(telopt, Q_US(q), Q_WANTYES_OP);
				break;
			case Q_WANTNO_OP:
				this.set_rfc1143(telopt, Q_US(q), Q_WANTNO);
				break;
			}
			break;
		}
	}

	public send_buffer(buffer: StaticArray<u8>): void {
		let size = buffer.length;
		let l = 0, i = 0;
		for (; i != size; ++i) {
			/* dump prior portion of text, send escaped bytes */
			if (buffer[i] == TELNET_IAC) {
				/* dump prior text if any */
				if (i != l) {
					let onSend = this.onSend;
					if (onSend) onSend(this, StaticArray.slice(buffer, l, i - l));
				}
				l = i + 1;

				/* send escape */
				this.iac(TELNET_IAC);
			}
		}

		/* send whatever portion of buffer is left */
		if (i != l) {
			let onSend = this.onSend;
			if (onSend) onSend(this, StaticArray.slice(buffer, l, i - l));
		}
	}

	public send_text(str: string): void {
		let buffer = String.UTF8.encode(str);
		this.send_buffer(changetype<StaticArray<u8>>(buffer));
	}

	public send_subnegotation(telopt: u8, buffer: StaticArray<u8>): void {
		let onSend = this.onSend;
		if (onSend) {
			onSend(this, [TELNET_IAC, TELNET_SB, telopt]);
			this.send_buffer(buffer);
			onSend(this, [TELNET_IAC, TELNET_SE]);
		}
	}

	public begin_sb(telopt: u8): void {
		let onSend = this.onSend;
		if (onSend) onSend(this, [TELNET_IAC, TELNET_SB, telopt]);
	}

	public begin_newenviron(cmd: u8): void {
		this.begin_sb(TELNET_TELOPT_NEW_ENVIRON);
		this.send_buffer([cmd]);
	}

	public newenviron_value(env_type: u8, str: string): void {
		this.send_buffer([env_type]);
		this.send_buffer(changetype<StaticArray<u8>>(String.UTF8.encode(str)));
	}

	public ttype_send(): void {
		let onSend = this.onSend;
		if (onSend) onSend(this, [TELNET_IAC, TELNET_SB, TELNET_TELOPT_TTYPE, TELNET_TTYPE_SEND, TELNET_IAC, TELNET_SE]);
	}

	public ttype_is(ttype: string): void {
		let onSend = this.onSend;
		if (onSend) {
			this.send_buffer([ TELNET_IAC, TELNET_SB, TELNET_TELOPT_TTYPE, TELNET_TTYPE_IS ]);
			onSend(this, changetype<StaticArray<u8>>(String.UTF8.encode(ttype)));
			this.finish_sb();
		}
	}

	public finish_sb(): void {
		this.iac(TELNET_SE);
	}
}



