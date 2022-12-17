export class User {
	constructor(
		public email: string | null | undefined,
		public password: string | null | undefined,
		public fio: string | null | undefined,
		public id?: number | undefined,
	) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.fio = fio;
	}
}
