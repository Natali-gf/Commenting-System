import { IBlock } from "../others/Config.js";

export default class CommentsCounter implements IBlock {
	parentBlock: HTMLDivElement = document.createElement('div');
	blockClassName: string = 'comments__title';

	public rendering(){
		this.parentBlock.className = this.blockClassName;
		const renderedBlock: HTMLElement = document.querySelector(`.${this.blockClassName}`);
		renderedBlock.innerHTML = `
				<h3>Комментарии</h3>
				<div id="countedComments" class="comments__amount">
					(${JSON.parse(localStorage.getItem('allTheComments')).length})
				</div>`;
	}
}