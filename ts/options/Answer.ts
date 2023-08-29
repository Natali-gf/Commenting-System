import FormBlock from "../commentsBlocks/FormBlock.js";
import { Comment, IBlock } from "../others/Config.js";

export default class Answer implements IBlock {
	public _parentBlock: HTMLButtonElement = document.createElement('button');
	private blockClassName: string = 'option__answer';
	private buttonName:string = 'Ответить';

	public rendering(comment: Comment): void {
		this._parentBlock.className = this.blockClassName;
		this._parentBlock.textContent = this.buttonName;

		this.addEvents(comment);
	}

	private addEvents(comment: Comment): void {
		this._parentBlock.addEventListener('click', (): void => {
			FormBlock.rendering(comment);
			FormBlock._textarea.focus();
//! закомментированный кусок кода выдаёт следующую ошибку
//! Property 'selectstart' does not exist on type 'HTMLAreaElement'.
//! при этом если код раскомментировать, то он работает и выполняет задуманное действие
//! только подчёркивает красным и говорит об ошибке
//! не понимаю почему это свойство не существует, ведь если пройти по пути type 'HTMLAreaElement' -
//! свойство 'selectstart' там есть
			// FormBlock._textarea.selectionStart = FormBlock.inputValue.length;
		})
	}

	public get parentBlock(): HTMLButtonElement {
		return this._parentBlock;
	}
}