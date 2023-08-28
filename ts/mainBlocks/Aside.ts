import { IBlock } from "../others/Config.js";

export default class Aside implements IBlock{
	parentBlock: HTMLElement = document.createElement('aside');
	blockClassName: string = 'wrapper__sidebar';

	rendering(){
		this.parentBlock.className = this.blockClassName;
	}
}