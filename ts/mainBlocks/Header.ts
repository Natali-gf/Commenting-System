import { IBlock } from "../others/Config.js";

export default class Header implements IBlock {
	public _parentBlock: HTMLElement = document.createElement('header');
	private blockClassName: string = 'wrapper__header';

	public rendering(): void {
		this._parentBlock.className = this.blockClassName;
	}

	public parentBlock(): HTMLElement {
		return this._parentBlock;
	}
}