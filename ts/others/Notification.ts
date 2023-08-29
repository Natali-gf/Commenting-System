import Config from "./Config.js";

export default class Notification {
	private errorMessage: string = 'Слишком длинное сообщение';
	private descriptionMessage: string = 'Макс. 1000 символов'
	public _textNotification: HTMLDivElement = document.createElement('div');
	public _errorNotification: HTMLDivElement = document.createElement('div');
	private isError: boolean = false;
	private config: Config;

	constructor() {
		this.config = new Config();
	}

	public changeDescription(messageLength: number): void  {
		this._textNotification.textContent = `${messageLength}/1000`;

		if(!this.isError && messageLength > this.config.maxMessageLength) {
			this._errorNotification.classList.remove('hidden');
			this._textNotification.classList.add('form-block__notification_error');
			this.isError = true;
		} else if(this.isError && messageLength <= this.config.maxMessageLength) {
			this._errorNotification.classList.add('hidden');
			this._textNotification.classList.remove('form-block__notification_error');
			this.isError = false;
		}
	}

	public rendering(messageLength: number): void {
		this._textNotification.className = 'form-block__notification';
		this._errorNotification.className = 'form-block__error-message hidden';
		this._textNotification.textContent = messageLength
												? `${messageLength}/1000`
												: this.descriptionMessage;
		this._errorNotification.textContent = this.errorMessage;
	}

	public get textNotification(): HTMLDivElement {
		return this._textNotification;
	}
	public get errorNotification(): HTMLDivElement {
		return this._errorNotification;
	}
}