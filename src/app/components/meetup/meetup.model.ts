import { User } from './user.model';

export class Meetup {
	constructor(
		public id: number,
		public name: string,
		public description: string,
		public location: string,
		public target_audience: string,
		public need_to_know: string,
		public will_happen: string,
		public reason_to_come: string,
		public time: string,
		public duration: number,
		public createdBy: number,
		public createdAt: string,
		public owner: User,
		public users: User[]
	) {
		this.id = id;
		this.name = name;
		this.description = description,
			this.location = location,
			this.target_audience = target_audience,
			this.need_to_know = need_to_know,
			this.will_happen = will_happen,
			this.reason_to_come = reason_to_come,
			this.time = time,
			this.duration = duration,
			this.createdBy = createdBy,
			this.owner = owner,
			this.users = users
	}
}

export interface MeetupForm {
	name: string | null,
	description: string | null,
	time: string | null,
	duration: number | null,
	location: string | null,
	target_audience: string | null,
	need_to_know: string | null,
	will_happen: string | null,
	reason_to_come: string | null
}
// Argument of type ' }>' is not assignable to parameter of type 'MeetupForm'.
// 	Property 'name' is optional in type 'Partial<{ name: string | null | undefined; description: string | null; time: string | null; duration: number | null; location: string | null; target_audience: string | null; need_to_know: string | null; will_happen: string | null; reason_to_come: string | null; }>