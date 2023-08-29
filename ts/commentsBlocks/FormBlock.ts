import UserComments from "./UserComments.js";
import Config, { IBlock, Id, Comment } from "../others/Config.js";
import Notification from "../others/Notification.js";
import User from "../others/User.js";
import { updateCommentsStorage } from "../helpers/storage.js";
import { FavoriteComment } from "../enum/favorite.js";
import CommentsCounter from "../options/CommentsCounter.js";

export default class FormBlock implements IBlock {
	public _parentBlock: HTMLDivElement = document.createElement('div');
	public static _textarea: HTMLAreaElement;
	private blockClassName: string = 'form-block comments__form-block';
	private isAnswer: Id | null = null;
	private isButtonDisabled: boolean = true;
	private user: User;
	private notifications: Notification;
	private config: Config;
	private userComments: UserComments;

	public constructor() {
		this.user = new User();
		this.notifications = new Notification();
		this.config = new Config();
		this.userComments = new UserComments();
	}

	public rendering(comment?: Comment): void {
		this._parentBlock.className = this.blockClassName;
		const renderedBlock: HTMLElement = document.querySelector('.form-block');

		renderedBlock.innerHTML = `
					<img class="form-block__user_photo user_photo"
						src="${this.user._userPhoto}"></img>
					<div class="form-block__user_name user_name">${this.user._userName}</div>
					${comment != undefined ?
					`<div class="form-block__answer">
						<div class="form-block__answer_user-name">${comment.userName}</div>
						<button id="btnCancel" class="form-block__answer_cancel"></button>
					</div>` : ''}
					<form id="form" class="form-block__form form">
						<textarea id="textarea" class="form__input" type="text" rows="1" required minlength="1"
							placeholder="Введите текст сообщения..."></textarea>
						<button id="buttonSend" class="form__button" type="submit" disabled>Отправить</button>
					</form>`;

		FormBlock._textarea = <HTMLAreaElement>document.getElementById('textarea');
		const form: HTMLFormElement = <HTMLFormElement>document.getElementById('form');
		let btnCancel: HTMLButtonElement;
		if(comment != undefined){
			btnCancel = <HTMLButtonElement>document.getElementById('btnCancel');
			this.isAnswer = comment.id;
		}

		renderedBlock.append(this.notifications._textNotification);
		renderedBlock.append(this.notifications._errorNotification);
		this.notifications.rendering();

		this.addEvents(form, btnCancel);
	}

	private addEvents(form: HTMLFormElement, btnCancel: HTMLButtonElement): void {
		if(this.isAnswer != null){
			btnCancel.addEventListener('click', () => {
				this.isAnswer = null;
				this.rendering();
			})
		}

		form.addEventListener('submit', (e: Event): void => this.sendForm(e));

		FormBlock._textarea.addEventListener('input', (e: Event): void => {
			const btnSend: HTMLButtonElement = <HTMLButtonElement>document.getElementById('buttonSend')
			const target: HTMLInputElement = <HTMLInputElement>e.target;
			target.style.height = 'auto';
  			target.style.height = target.scrollHeight + 1 + "px";

			this.notifications.changeDescription(target.value.length);

			if(this.isButtonDisabled && target.value.length <= this.config.maxMessageLength){
				btnSend.removeAttribute('disabled');
				this.isButtonDisabled = false;
			} else if(!this.isButtonDisabled
						&& (target.value.length === 0 || target.value.length > this.config.maxMessageLength)) {
							btnSend.setAttribute('disabled', 'true');
							this.isButtonDisabled = true;
			}
		})
	}

	private sendForm(e: Event): void {
		e.preventDefault();

		const message: Comment = {
			id: crypto.randomUUID(),
			parentId: this.isAnswer ? this.isAnswer : null,
			answerIds: [],
			lastAnswer: new Date(),
			userPhoto: this.user._userPhoto,
			userName: this.user._userName,
			dataComment: new Date(),
			isFavorite: FavoriteComment.Out,
			noParentForFavorite: false,
			rating: {
				currentRating: this.config.defaultRating,
				votes: [],
			},
			textComment: e.target[0].value,
		}

		this.isAnswer = null;
		this.isButtonDisabled = true;

		this.userComments.rendering(updateCommentsStorage(message));
		this.rendering();
		const comentsCounter = new CommentsCounter()
		comentsCounter.rendering();
	}

	public parentBlock(): HTMLDivElement {
		return this._parentBlock;
	}
	public textarea(): HTMLAreaElement {
		return FormBlock._textarea;
	}
}
