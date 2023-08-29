import { IBlock } from "../others/Config.js";

export default class Aside implements IBlock{
	public _parentBlock: HTMLElement = document.createElement('aside');
	private blockClassName: string = 'wrapper__sidebar';

	public rendering(): void {
		this._parentBlock.className = this.blockClassName;
	}

	public parentBlock(): HTMLElement {
		return this._parentBlock;
	}
}