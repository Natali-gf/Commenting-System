import { IBlock } from "../others/Config.js";
import Favorite from "../options/Favorite.js";
import Sort from "../options/Sort.js";
import CommentsCounter from "../options/CommentsCounter.js";

export default class CommentsHeader implements IBlock {
	public _parentBlock: HTMLDivElement = document.createElement('div');
	private blockClassName: string = 'comments__header';
	private sort: Sort;
	private favorite: Favorite;
	private commentsCounter: CommentsCounter;

	public constructor() {
		this.commentsCounter = new CommentsCounter()
		this.sort = new Sort();
		this.favorite = new Favorite();
	}

	public rendering(): void {
		this._parentBlock.className = this.blockClassName;
		this._parentBlock.append(this.commentsCounter.parentBlock);
		this._parentBlock.append(this.sort.parentBlock);
		this._parentBlock.append(this.favorite.parentBlock);
		this.commentsCounter.rendering();
		this.sort.rendering();
		this.favorite.rendering();
	}

	public get parentBlock(): HTMLDivElement {
		return this._parentBlock;
	}
}