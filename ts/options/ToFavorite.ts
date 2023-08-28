import UserComments from "../commentsBlocks/UserComments.js";
import { FavoriteComment } from "../enum/favorite.js";
import { updateFavoriteStorage } from "../helpers/storage.js";
import { Comment, IBlock } from "../others/Config.js";
import Favorite from "./Favorite.js";

export default class ToFavorite implements IBlock {
	parentBlock: HTMLButtonElement = document.createElement('button');
	blockClassName: string = 'option__favorite';
	textFavoriteIn: string = 'В избранном';
	textFavoriteOut: string = 'В избранное';
	classNameFavoriteIn: string = 'option__favorite_in';
	classNameFavoriteOut: string = 'option__favorite_out';
	isFavoriteComment: FavoriteComment;
	favorite: Favorite;
	favoriteBtn: HTMLElement;

	constructor(){
		this.favorite = new Favorite();
	}

	public rendering(comment: Comment, key: number): void {
		this.parentBlock.className = this.blockClassName;
		this.parentBlock.id = `favoriteBtn${key}`;
		this.isFavoriteComment = comment.isFavorite;
		this.favoriteBtn = document.getElementById(`favoriteBtn${key}`)
		if(comment.isFavorite === FavoriteComment.In){
			this.favoriteBtn.textContent = this.textFavoriteIn;
			this.favoriteBtn.classList.add(this.classNameFavoriteIn)
		} else {
			this.favoriteBtn.textContent = this.textFavoriteOut;
			this.favoriteBtn.classList.add(this.classNameFavoriteOut)
		}

		this.addEvents(comment);
	}

	private addEvents(comment: Comment){
		this.favoriteBtn.addEventListener('click', () => this.updateFavorite(comment))
	}

	private updateFavorite(comment: Comment) {
		if(this.isFavoriteComment === FavoriteComment.In){
			this.favoriteBtn.textContent = this.textFavoriteOut;
			this.favoriteBtn.classList.add(this.classNameFavoriteOut);
			this.favoriteBtn.classList.remove(this.classNameFavoriteIn);
			this.isFavoriteComment = FavoriteComment.Out
			comment.isFavorite = FavoriteComment.Out
		} else {
			this.favoriteBtn.textContent = this.textFavoriteIn;
			this.favoriteBtn.classList.add(this.classNameFavoriteIn);
			this.favoriteBtn.classList.remove(this.classNameFavoriteOut);
			this.isFavoriteComment = FavoriteComment.In
			comment.isFavorite = FavoriteComment.In
		}
		console.log(comment)
		updateFavoriteStorage(comment);
	}
}