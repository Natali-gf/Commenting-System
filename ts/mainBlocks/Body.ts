import { Comment } from "../others/Config.js";
import Aside from "./Aside.js";
import Header from "./Header.js";
import Main from "./Main.js";

export default class Body {
	private body: HTMLBodyElement;
	private aside: Aside;
	private header: Header;
	private main: Main;

	public constructor() {
		this.body = document.querySelector('.wrapper');
		this.aside = new Aside();
		this.header = new Header();
		this.main = new Main();
	}

	public rendering(): void {
		this.body.append(this.header._parentBlock);
		this.body.append(this.aside._parentBlock);
		this.body.append(this.main._parentBlock);
		this.header.rendering();
		this.aside.rendering();
		this.main.rendering();
	}

	public checkLocalStorage(comments: Comment[]): Comment[] {

		if(!localStorage.getItem('allTheComments')){
			let favoriteComments: Comment[] = [];
			comments.forEach((comment: Comment) => {
				if(comment.isFavorite) {
					favoriteComments.push(comment)
				}
			})
			localStorage.setItem('allTheComments', JSON.stringify(comments));
			localStorage.setItem('favoriteComments', JSON.stringify(favoriteComments));
		}

		return JSON.parse(localStorage.getItem('allTheComments'));
	}
}