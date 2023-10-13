import FormBlock from "../commentsBlocks/FormBlock.js";
import { Comment, IBlock } from "../others/Config.js";

export default class Answer implements IBlock {
	public _parentBlock: HTMLButtonElement = document.createElement('button');
	private blockClassName: string = 'option__answer';
	private buttonName:string = 'Answer';

	public rendering(comment: Comment): void {
		this._parentBlock.className = this.blockClassName;
		this._parentBlock.textContent = this.buttonName;

		this.addEvents(comment);
	}

	private addEvents(comment: Comment): void {
		this._parentBlock.addEventListener('click', (): void => {
			FormBlock.rendering(comment);
			FormBlock._textarea.focus();
			FormBlock._textarea.selectionStart = FormBlock.inputValue.length;
		})
	}

	public get parentBlock(): HTMLButtonElement {
		return this._parentBlock;
	}
}