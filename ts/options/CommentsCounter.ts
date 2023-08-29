import { IBlock } from "../others/Config.js";

export default class CommentsCounter implements IBlock {
	public _parentBlock: HTMLDivElement = document.createElement('div');
	private blockClassName: string = 'comments__title';

	public rendering(): void {
		this._parentBlock.className = this.blockClassName;
		const renderedBlock: HTMLElement = document.querySelector(`.${this.blockClassName}`);
		renderedBlock.innerHTML = `
				<h3>Комментарии</h3>
				<div id="countedComments" class="comments__amount">
					(${JSON.parse(localStorage.getItem('allTheComments')).length})
				</div>`;
	}

	public get parentBlock(): HTMLDivElement {
		return this._parentBlock;
	}
}