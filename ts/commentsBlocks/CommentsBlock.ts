import UserComments from "./UserComments.js";
import CommentsHeader from "./CommentsHeader.js";
import { Comment, IBlock } from "../others/Config.js";
import FormBlock from "./FormBlock.js";
import { startComments } from "../data/data.js";

export default class CommentsBlock implements IBlock {
	parentBlock: HTMLDivElement = document.createElement('div');
	blockClassName: string = 'comments content__comments';
	commentsHeader: CommentsHeader;
	formBlock: FormBlock;
	userComments: UserComments;

	constructor(){
		this.commentsHeader = new CommentsHeader();
		this.formBlock = new FormBlock();
		this.userComments = new UserComments()
	}

	public rendering(){
		const commentsStorage = this.checkLocalStorage()
		this.parentBlock.className = this.blockClassName;
		this.parentBlock.append(this.commentsHeader.parentBlock);
		this.parentBlock.append(this.formBlock.parentBlock);
		this.parentBlock.append(this.userComments.parentBlock);
		this.commentsHeader.rendering();
		this.formBlock.rendering();
		this.userComments.rendering(commentsStorage);
	}

	private checkLocalStorage() {
		// localStorage.clear();

		if(!localStorage.getItem('allTheComments')){
			localStorage.setItem('allTheComments', JSON.stringify(startComments));
		}
		if(!localStorage.getItem('favoriteComments')){
			let favoriteComments: Comment[] = []
			startComments.forEach((comment: Comment) => {
				if(comment.isFavorite) {
					favoriteComments.push(comment)
				}
			})
			localStorage.setItem('favoriteComments', JSON.stringify(favoriteComments));
		}

		return JSON.parse(localStorage.getItem('allTheComments'));
	}
}