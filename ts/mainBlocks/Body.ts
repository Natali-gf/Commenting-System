import { Comment } from "../others/Config.js";
import Aside from "./Aside.js";
import Header from "./Header.js";
import Main from "./Main.js";

export default class Body {
	public static _body: HTMLBodyElement;
	private aside: Aside;
	private header: Header;
	private main: Main;

	public constructor() {
		Body._body = document.querySelector('.wrapper');
		this.aside = new Aside();
		this.header = new Header();
		this.main = new Main();
	}

	public rendering(): void {
		Body._body.append(this.header.parentBlock);
		Body._body.append(this.aside.parentBlock);
		Body._body.append(this.main.parentBlock);
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

	public get body(): HTMLBodyElement {
		return Body._body;
	}
}
