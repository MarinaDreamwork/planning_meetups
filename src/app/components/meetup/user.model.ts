export interface UserRole {
	id: number,
	userId: number,
	roleId: number,
	createdAt: string,
	updatedAt: string
}

export interface Role {
	UserRole: UserRole,
	createdAt: string,
	id: number,
	name: string,
	updatedAt: string
}

export class User {
	constructor(
		public email: string | null | undefined,
		public password: string | null | undefined,
		public fio: string | null | undefined,
		public id?: number | undefined,
		public roles?: Role[]
	) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.fio = fio;
	}
}
