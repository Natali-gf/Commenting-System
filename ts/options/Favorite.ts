import UserComments from "../commentsBlocks/UserComments.js";
import { FavoriteComment } from "../enum/favorite.js";
import { Comment, IBlock } from "../others/Config.js";

export default class Favorite implements IBlock {
	public _parentBlock: HTMLDivElement = document.createElement('div');
	private blockClassName: string = 'comments__favorite favorite';
	private useFavorite: FavoriteComment = FavoriteComment.Out;

	public rendering(): void {
		this._parentBlock.className = this.blockClassName;
		this._parentBlock.innerHTML = `<h4 class="favorite__title">Избранное</h4>`;

		this.addEvents()
	}

	private addEvents(){
		this._parentBlock.addEventListener('click', (): void => {
			let commentsStorage: Comment[];
			const title: HTMLElement = document.querySelector('.favorite__title');

			if(this.useFavorite === FavoriteComment.Out) {
				commentsStorage = JSON.parse(localStorage.getItem('favoriteComments'));
				title.classList.add('favorite__title_active');
				this.useFavorite = FavoriteComment.In;
			} else {
				commentsStorage = JSON.parse(localStorage.getItem('allTheComments'));
				title.classList.remove('favorite__title_active');
				this.useFavorite = FavoriteComment.Out;
			}

			this.filterComments(commentsStorage)
		})
	}

	public filterComments(commentsStorage: Comment[]): void {
		commentsStorage.forEach((answer: Comment) => {
			if(answer.parentId != null
				&& !commentsStorage.some((item: Comment) => answer.parentId === item.id)) {
					answer.noParentForFavorite = true;
			}

		})

		const comments: UserComments = new UserComments();
		comments.rendering(commentsStorage);
	}

	public parentBlock(): HTMLDivElement {
		return this._parentBlock;
	}
}