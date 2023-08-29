import { Id } from "./Config.js";

export default class User {
	public _userId: Id;
	public _userPhoto: string;
	public _userName: string;

	public constructor() {
		this._userId = '135f42f7-c467-42bd-863f-d00836ce156c';
		this._userPhoto = 'assets/images/girl_anime.jpg';
		this._userName = 'Natali Popova';
	}

	public userId(): Id {
		return this._userId;
	}
	public userPhoto(): string {
		return this._userPhoto;
	}
	public userName(): string {
		return this._userName;
	}
}