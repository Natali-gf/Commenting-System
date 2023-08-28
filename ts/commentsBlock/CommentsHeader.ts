import { IBlock, ParentElement } from "../others/Config.js";
import Favorite from "../options/Favorite.js";
import Sort from "../options/Sort.js";

export default class CommentsHeader implements IBlock {
	parentBlock: HTMLDivElement = document.createElement('div');
	blockClassName: string = 'comments__header';
	sort: Sort;
	favorite: Favorite;

	constructor(){
		this.sort = new Sort()
		this.favorite = new Favorite()
	}

	public rendering(){
		this.parentBlock.className = 'comments__header';
		this.parentBlock.innerHTML = `
						<div class="comments__title">
							<h3>Комментарии</h3>
							<div id="countedComments" class="comments__amount">(${JSON.parse(localStorage.getItem('allTheComments')).length})</div>
						</div>`;

		this.parentBlock.append(this.sort.parentBlock);
		this.parentBlock.append(this.favorite.parentBlock);
		this.sort.rendering();
		this.favorite.rendering();
	}
}