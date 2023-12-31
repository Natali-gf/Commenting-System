import UserComments from "./UserComments.js";
import Config, { Id, Comment } from "../others/Config.js";
import Notification from "../others/Notification.js";
import User from "../others/User.js";
import { updateCommentsStorage } from "../helpers/storage.js";
import { FavoriteComment } from "../enum/favorite.js";
import CommentsCounter from "../options/CommentsCounter.js";
import Favorite from "../options/Favorite.js";

export default class FormBlock {
	public _parentBlock: HTMLDivElement = document.createElement('div');
	public static _textarea: HTMLTextAreaElement;
	public static inputValue: string = '';
	private blockClassName: string = 'form-block comments__form-block';
	private static isAnswer: Id | null = null;
	private static isButtonDisabled: boolean;
	private static config: Config;

	public constructor() {
		this._parentBlock.className = this.blockClassName;
		FormBlock.config = new Config();
	}

	public static rendering(comment?: Comment): void {
		this.inputValue === ''
				? FormBlock.isButtonDisabled = true
				: FormBlock.isButtonDisabled = false;

		const renderedBlock: HTMLElement = document.querySelector('.form-block');
		renderedBlock.innerHTML = `
				<img class="form-block__user_photo user_photo"
					src="${User._userPhoto}"></img>
				<div class="form-block__user_name user_name">${User._userName}</div>
				${comment != undefined ?
				`<div class="form-block__answer">
					<div class="form-block__answer_user-name">${comment.userName}</div>
					<button id="btnCancel" class="form-block__answer_cancel"></button>
				</div>` : ''}
				<form id="form" class="form-block__form form">
					<textarea id="textarea" class="form__input" type="text" rows="1" required minlength="1"
						placeholder="Enter your comment...">${this.inputValue}</textarea>
					<button id="buttonSend" class="form__button" type="submit"
						${this.inputValue === '' ? "disabled" : ''}>Send</button>
				</form>`;

		FormBlock._textarea = <HTMLTextAreaElement>document.getElementById('textarea');
		const form: HTMLFormElement = <HTMLFormElement>document.getElementById('form');
		let btnCancel: HTMLButtonElement;
		if(comment != undefined){
			btnCancel = <HTMLButtonElement>document.getElementById('btnCancel');
			this.isAnswer = comment.id;
		}

		const notifications: Notification = new Notification();
		renderedBlock.append(notifications.textNotification);
		renderedBlock.append(notifications.errorNotification);
		notifications.rendering(this.inputValue.length);

		this.addEvents(form, btnCancel, notifications);
	}

	private static addEvents(form: HTMLFormElement, btnCancel: HTMLButtonElement, notifications: Notification): void {
		if(this.isAnswer != null){
			btnCancel.addEventListener('click', () => {
				this.isAnswer = null;
				this.rendering();
			})
		}

		form.addEventListener('submit', (e: Event): void => this.sendForm(e));

		FormBlock._textarea.addEventListener('input', (e: Event): void => {
			const btnSend: HTMLButtonElement = <HTMLButtonElement>document.getElementById('buttonSend')
			const target: HTMLTextAreaElement = <HTMLTextAreaElement>e.target;
			target.style.height = 'auto';
  			target.style.height = target.scrollHeight + "px";
			this.inputValue = target.value;

			notifications.changeDescription(target.value.length);

			if(this.isButtonDisabled && this.inputValue.length <= this.config.maxMessageLength){
				btnSend.removeAttribute('disabled');
				this.isButtonDisabled = false;
			} else if(!this.isButtonDisabled
						&& (this.inputValue.length === 0 || this.inputValue.length > this.config.maxMessageLength)) {
							btnSend.setAttribute('disabled', 'true');
							this.isButtonDisabled = true;
			}
		})
	}

	private static sendForm(e: Event): void {
		e.preventDefault();

		const message: Comment = {
			id: crypto.randomUUID(),
			parentId: this.isAnswer ? this.isAnswer : null,
			answerIds: [],
			lastAnswer: new Date(),
			userPhoto: User._userPhoto,
			userName: User._userName,
			dataComment: new Date(),
			isFavorite: FavoriteComment.Out,
			noParentForFavorite: false,
			rating: {
				currentRating: this.config.defaultRating,
				votes: [],
			},
			textComment: this.inputValue,
		}

		this.inputValue = ''
		this.isAnswer = null;
		this.isButtonDisabled = true;

		let commentsStorage: Comment[] = updateCommentsStorage(message);
		commentsStorage = Favorite.useFavorite
				? JSON.parse(localStorage.getItem('favoriteComments'))
				: commentsStorage;

		UserComments.rendering(commentsStorage);
		this.rendering();
		const comentsCounter = new CommentsCounter()
		comentsCounter.rendering();
	}

	public get parentBlock(): HTMLDivElement {
		return this._parentBlock;
	}
	public get textarea(): HTMLTextAreaElement {
		return FormBlock._textarea;
	}
}
