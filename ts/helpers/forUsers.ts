import { Comment } from "../others/Config";
import { Id } from "../others/Config.js";

export function getUserNameByParentId(parentId: Id): string {
	const commentsStorage: Comment[] = JSON.parse(localStorage.getItem('allTheComments'));
	for (const key in commentsStorage) {
		if(parentId === commentsStorage[key].id) {
			return commentsStorage[key].userName;
		}
	}
}

export async function getRandomUserPhoto(): Promise<string> {
	return new Promise<string>((resolve) => {
		fetch(`https://picsum.photos/61/61`)
			.then((response) => {
				let randomPitureUrl: string = response.url;
				resolve(randomPitureUrl);
			})
			.catch(error => {
				console.log('error', error);
			})
	})
}

export async function changeUserPhoto(comments: Comment[]): Promise<Comment[]> {
	return new Promise<Comment[]>((resolve) => {
		comments.forEach((comment: Comment, index: number) => {

			getRandomUserPhoto().then((url) => {
				comment.userPhoto = url;

				if(index === comments.length - 1){
					resolve(comments)
				}
			});

		})
	})
}