import { IBlock } from "../others/Config.js";

export default class Header implements IBlock {
	parentBlock: HTMLElement = document.createElement('header');
	blockClassName: string = 'wrapper__header';

	public rendering(){
		this.parentBlock.className = this.blockClassName;
	}
}