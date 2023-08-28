import { IBlock } from "../others/Config.js";
import Favorite from "../options/Favorite.js";
import Sort from "../options/Sort.js";
import CommentsCounter from "../options/CommentsCounter.js";

export default class CommentsHeader implements IBlock {
	parentBlock: HTMLDivElement = document.createElement('div');
	blockClassName: string = 'comments__header';
	sort: Sort;
	favorite: Favorite;
	commentsCounter: CommentsCounter;

	constructor(){
		this.commentsCounter = new CommentsCounter()
		this.sort = new Sort();
		this.favorite = new Favorite();
	}

	public rendering(){
		this.parentBlock.className = this.blockClassName;
		this.parentBlock.append(this.commentsCounter.parentBlock);
		this.parentBlock.append(this.sort.parentBlock);
		this.parentBlock.append(this.favorite.parentBlock);
		this.commentsCounter.rendering();
		this.sort.rendering();
		this.favorite.rendering();
	}
}