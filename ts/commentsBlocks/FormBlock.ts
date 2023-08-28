import UserComments from "./UserComments.js";
import Config, { IBlock, Id, Comment } from "../others/Config.js";
import Notification from "../others/Notification.js";
import User from "../others/User.js";
import { updateCommentsStorage } from "../helpers/storage.js";
import { FavoriteComment } from "../enum/favorite.js";
import CommentsCounter from "../options/CommentsCounter.js";

export default class FormBlock implements IBlock {
	parentBlock: HTMLDivElement = document.createElement('div');
	blockClassName: string = 'form-block comments__form-block';
	user: User;
	textarea: HTMLAreaElement;
	btnCancel: HTMLElement;
	notifications: Notification;
	isButtonDisabled: boolean = true;
	config: Config;
	userComments: UserComments;
	isAnswer: Id | null = null;
	formBlock: HTMLElement;
	form: HTMLElement

	constructor(){
		this.user = new User();
		this.notifications = new Notification();
		this.config = new Config();
		this.userComments = new UserComments();
	}

	public rendering(comment?: Comment){
		this.parentBlock.className = this.blockClassName;
		this.formBlock = document.querySelector('.form-block');

		this.formBlock.innerHTML = `
					<img class="form-block__user_photo user_photo"
						src="${this.user.userPhoto}"></img>
					<div class="form-block__user_name user_name">${this.user.userName}</div>
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

		this.textarea = <HTMLAreaElement>document.getElementById('textarea');
		this.form = document.getElementById('form');
		this.formBlock.append(this.notifications.textNotification);
		this.formBlock.append(this.notifications.errorNotification);
		this.notifications.rendering();
		if(comment != undefined){
			this.isAnswer = comment.id;
			this.btnCancel = document.getElementById('btnCancel');
		}

		this.addEvents();
	}

	private addEvents() {
		if(this.isAnswer != null){
			this.btnCancel.addEventListener('click', () => {
				this.isAnswer = null;
				this.rendering();
			})
		}

		this.form.addEventListener('submit', (e: Event) => this.sendForm(e));

		this.textarea.addEventListener('input', (e: Event) => {
			const target: HTMLInputElement = <HTMLInputElement>e.target
			target.style.height = 'auto';
  			target.style.height = target.scrollHeight + 1 + "px";

			this.notifications.changeDescription(target.value.length);

			if(this.isButtonDisabled && target.value.length <= this.config.maxMessageLength){
				document.getElementById('buttonSend').removeAttribute('disabled');
				this.isButtonDisabled = false;
			} else if(!this.isButtonDisabled
						&& (target.value.length === 0 || target.value.length > this.config.maxMessageLength)) {
				document.getElementById('buttonSend').setAttribute('disabled', 'true');
				this.isButtonDisabled = true;
			}
		})
	}

	private sendForm(e: Event){
		e.preventDefault();

		const message: Comment = {
			id: crypto.randomUUID(),
			parentId: this.isAnswer ? this.isAnswer : null,
			answerIds: [],
			lastAnswer: new Date(),
			userPhoto: this.user.userPhoto,
			userName: this.user.userName,
			dataComment: new Date(),
			isFavorite: FavoriteComment.Out,
			noParentForFavorite: false,
			rating: {
				currentRating: this.config.defaultRating,
				votes: []
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
}
