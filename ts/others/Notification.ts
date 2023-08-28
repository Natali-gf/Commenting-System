import Config, { IBlock } from "./Config.js";

export default class Notification {
	errorMessage: string = 'Слишком длинное сообщение';
	descriptionMessage: string = 'Макс. 1000 символов'
	textNotification: HTMLDivElement = document.createElement('div');
	errorNotification: HTMLDivElement = document.createElement('div');
	isError: boolean = false;
	config: Config;

	constructor(){
		this.config = new Config();
	}

	changeDescription(messageLength: number) {
		this.textNotification.textContent = `${messageLength}/1000`;

		if(!this.isError && messageLength > this.config.maxMessageLength) {
			this.errorNotification.classList.remove('hidden');
			this.textNotification.classList.add('form-block__notification_error');
			this.isError = true;
		} else if(this.isError && messageLength <= this.config.maxMessageLength) {
			this.errorNotification.classList.add('hidden');
			this.textNotification.classList.remove('form-block__notification_error');
			this.isError = false;
		}
	}

	public resetTextNotification() {
		this.textNotification.textContent = this.descriptionMessage;
	}

	public rendering(){
		this.textNotification.className = 'form-block__notification';
		this.errorNotification.className = 'form-block__error-message hidden';
		this.textNotification.textContent = this.descriptionMessage;
		this.errorNotification.textContent = this.errorMessage;
	}
}