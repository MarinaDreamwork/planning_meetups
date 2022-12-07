export class User {
	constructor(
		public id: number,
		public email: string,
		public password: string,
		public fio: string
	) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.fio = fio;
	}
}
