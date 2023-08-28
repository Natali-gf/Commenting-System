import CommentsBlock from "../commentsBlocks/CommentsBlock.js";
import { IBlock } from "../others/Config.js";

export default class Main implements IBlock {
	parentBlock: HTMLElement = document.createElement('main');
	blockClassName: string = 'wrapper__content content';
	commentsBlock: CommentsBlock

	constructor() {
		this.commentsBlock = new CommentsBlock();
	}

	public rendering(){
		this.parentBlock.className = this.blockClassName;
		this.parentBlock.innerHTML = `
				<div class="content__main-section main-section">
					<ul class="main-section__list"></ul>
					<div class="main-section__article"></div>
				</div>`

		const list = document.querySelector('.main-section__list');
		for (let i = 0; i < 8; i++) {
			list.innerHTML += `<li class="main-section__item"></li>`
		}

		this.parentBlock.append(this.commentsBlock.parentBlock);
		this.commentsBlock.rendering();
	}
}