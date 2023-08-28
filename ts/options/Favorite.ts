import UserComments from "../commentsBlock/UserComments.js";
import { FavoriteComment } from "../enum/favorite.js";
import { Comment, IBlock } from "../others/Config.js";

export default class Favorite implements IBlock {
	parentBlock: HTMLDivElement = document.createElement('div');
	blockClassName: string = 'comments__favorite favorite';
	useFavorite: FavoriteComment = FavoriteComment.Out;

	public rendering(){
		this.parentBlock.className = this.blockClassName;
		this.parentBlock.innerHTML = `<h4 class="favorite__title">Избранное</h4>`;

		this.addEvents()
	}

	private addEvents(){
		this.parentBlock.addEventListener('click', () => {
			let commentsStorage: Comment[];
			if(this.useFavorite === FavoriteComment.Out) {
				commentsStorage = JSON.parse(localStorage.getItem('favoriteComments'));
				this.useFavorite = FavoriteComment.In
			} else {
				commentsStorage = JSON.parse(localStorage.getItem('allTheComments'));
				this.useFavorite = FavoriteComment.Out
			}

			this.filterComments(commentsStorage)
		})
	}

	private filterComments(commentsStorage: Comment[]) {
		const comments: UserComments = new UserComments();
		comments.rendering(commentsStorage);
	}
}