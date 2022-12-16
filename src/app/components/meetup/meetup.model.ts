import { User } from './user.model';

export class Meetup {
	constructor(
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