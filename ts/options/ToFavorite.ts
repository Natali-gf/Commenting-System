import { FavoriteComment } from "../enum/favorite.js";
import { updateFavoriteStorage } from "../helpers/storage.js";
import { Comment, IBlock } from "../others/Config.js";
import Favorite from "./Favorite.js";

export default class ToFavorite implements IBlock {
	public _parentBlock: HTMLButtonElement = document.createElement('button');
	private blockClassName: string = 'option__favorite';
	private textFavoriteIn: string = 'В избранном';
	private textFavoriteOut: string = 'В избранное';
	private classNameFavoriteIn: string = 'option__favorite_in';
	private classNameFavoriteOut: string = 'option__favorite_out';
	private isFavoriteComment: FavoriteComment;
	private favorite: Favorite;
	private favoriteBtn: HTMLElement;

	public constructor() {
		this.favorite = new Favorite();
	}

	public rendering(comment: Comment, key: number): void {
		this._parentBlock.className = this.blockClassName;
		this._parentBlock.id = `favoriteBtn${key}`;
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

	private addEvents(comment: Comment): void {
		this.favoriteBtn.addEventListener('click', (): void => {
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

			updateFavoriteStorage(comment);
		})
	}

	public parentBlock(): HTMLButtonElement {
		return this._parentBlock;
	}
}