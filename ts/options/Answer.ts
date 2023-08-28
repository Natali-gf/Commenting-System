import FormBlock from "../commentsBlocks/FormBlock.js";
import { Comment, IBlock } from "../others/Config.js";

export default class Answer implements IBlock {
	parentBlock: HTMLButtonElement = document.createElement('button');
	blockClassName: string = 'option__answer';
	buttonName:string = 'Ответить';
	form: FormBlock;

	public rendering(comment: Comment): void {
		this.parentBlock.className = this.blockClassName;
		this.parentBlock.textContent = this.buttonName;

		this.addEvents(comment);
	}

	private addEvents(comment: Comment){
		this.parentBlock.addEventListener('click', () => {
			this.form = new FormBlock();
			this.form.rendering(comment);
			this.form.textarea.focus();
		})
	}
}