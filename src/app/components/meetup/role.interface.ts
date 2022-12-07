export interface IRole {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	UserRole: IUserRole
}

interface IUserRole {
	id: number;
	userId: number;
	roleId: number;
	createdAt: string;
	updatedAt: string;
}

export interface ICurrentUser {
	email: string;
	exp: Date;
	iat: Date;
	id: number;
	roles: IRole[]
}