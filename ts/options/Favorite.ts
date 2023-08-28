import UserComments from "../commentsBlocks/UserComments.js";
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
			const title: HTMLElement = document.querySelector('.favorite__title');

			if(this.useFavorite === FavoriteComment.Out) {
				commentsStorage = JSON.parse(localStorage.getItem('favoriteComments'));
				this.useFavorite = FavoriteComment.In;
				title.classList.add('favorite__title_active');
			} else {
				commentsStorage = JSON.parse(localStorage.getItem('allTheComments'));
				this.useFavorite = FavoriteComment.Out;
				title.classList.remove('favorite__title_active');
			}

			this.filterComments(commentsStorage)
		})
	}

	public filterComments(commentsStorage: Comment[]) {
		const comments: UserComments = new UserComments();

		let commentsWithoutParrent = commentsStorage.forEach(answer => {
			if(answer.parentId != null
				&& !commentsStorage.some(item => answer.parentId === item.id)) {
					answer.noParentForFavorite = true;
					// return answer;
			}

		})
console.log(JSON.parse(localStorage.getItem('favoriteComments')))
		console.log(commentsWithoutParrent, commentsStorage)
		comments.rendering(commentsStorage);
	}
}