import UserComments from "../commentsBlock/UserComments.js";
import { FavoriteComment } from "../enum/favorite.js";
import { updateFavoriteStorage } from "../helpers/storage.js";
import { Comment, IBlock } from "../others/Config.js";

export default class ToFavorite implements IBlock {
	parentBlock: HTMLButtonElement = document.createElement('button');
	blockClassName: string = 'option__favorite';
	textFavoriteIn: string = 'В избранном';
	textFavoriteOut: string = 'В избранное';
	classNameFavoriteIn: string = 'option__favorite_in';
	classNameFavoriteOut: string = 'option__favorite_out';

	public rendering(comment: Comment, key: number): void {
		this.parentBlock.className = this.blockClassName;
		if(comment.isFavorite === FavoriteComment.In){
			this.parentBlock.textContent = this.textFavoriteIn;
			this.parentBlock.classList.add(this.classNameFavoriteIn)
		} else {
			this.parentBlock.textContent = this.textFavoriteOut;
			this.parentBlock.classList.add(this.classNameFavoriteOut)
		}

		this.addEvents(comment);
	}

	private addEvents(comment: Comment){
		this.parentBlock.addEventListener('click', () => this.updateFavorite(comment))
	}

	private updateFavorite(comment: Comment) {
		if(comment.isFavorite === FavoriteComment.In){
			this.parentBlock.textContent = this.textFavoriteOut;
			this.parentBlock.classList.add(this.classNameFavoriteOut);
		} else {
			this.parentBlock.textContent = this.textFavoriteIn;
			this.parentBlock.classList.add(this.classNameFavoriteIn);
		}

		const commentsStorage: Comment[] = updateFavoriteStorage(comment);
		this.updateComments(commentsStorage);
	}

	private updateComments(commentsStorage: Comment[]){
		const comments: UserComments = new UserComments();
		comments.rendering(commentsStorage);
	}
}