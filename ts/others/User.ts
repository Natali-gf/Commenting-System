import { Id } from "./Config.js";

export default class User {
	public static readonly _userId: Id = '135f42f7-c467-42bd-863f-d00836ce156c';
	public static readonly _userPhoto: string = 'assets/images/girl_anime.jpg';
	public static readonly _userName: string = 'Natali Popova';

	public get userId(): Id {
		return User._userId;
	}
	public get userPhoto(): string {
		return User._userPhoto;
	}
	public get userName(): string {
		return User._userName;
	}
}