import CommentsBlock from "../commentsBlocks/CommentsBlock.js";
import { IBlock } from "../others/Config.js";

export default class Main implements IBlock {
	public _parentBlock: HTMLElement = document.createElement('main');
	private blockClassName: string = 'wrapper__content content';
	private commentsBlock: CommentsBlock

	public constructor() {
		this.commentsBlock = new CommentsBlock();
	}

	public rendering(): void {
		this._parentBlock.className = this.blockClassName;
		this._parentBlock.innerHTML = `
				<div class="content__main-section main-section">
					<ul class="main-section__list"></ul>
					<div class="main-section__article"></div>
				</div>`

		const list = document.querySelector('.main-section__list');
		for (let i = 0; i < 8; i++) {
			list.innerHTML += `<li class="main-section__item"></li>`
		}

		this._parentBlock.append(this.commentsBlock._parentBlock);
		this.commentsBlock.rendering();
	}

	public parentBlock(): HTMLElement {
		return this._parentBlock;
	}
}