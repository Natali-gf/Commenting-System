import { Id } from "./Config.js";

export default class User {
	userId: Id;
	userPhoto: string;
	userName: string;

	constructor(){
		this.userId = '135f42f7-c467-42bd-863f-d00836ce156c';
		this.userPhoto = 'assets/images/girl_anime.jpg';
		this.userName = 'Natali Popova';
	}

	async getRandomUserPhoto(): Promise<string> {
		let randomPitureUrl: string;
		fetch(`https://picsum.photos/61/61`)
			.then((response) => {
				randomPitureUrl = response.url;
				console.log(response);
				// this.userPhoto = response.url;
			})
			.catch(error => {
				console.log('error', error);
				// this.userPhoto = response.url;
			})
		return randomPitureUrl;
	}
}