import { Comment, IBlock, Id } from "../others/Config.js";
import { Rating } from "../options/Rating.js";
import { getUserNameByParentId } from "../helpers/forUsers.js";
import ToFavorite from "../options/ToFavorite.js";
import Answer from "../options/Answer.js";



export default class UserComments implements IBlock {
	parentBlock: HTMLDivElement = document.createElement('div');
	blockClassName: string = 'comments__user-comments';
	userCommentsBlock: Element;
	rating: Rating;
	toFavorite: ToFavorite;
	answer: Answer;

	constructor(){
	}

	public rendering(commentsStorage: Comment[]){
		this.parentBlock.className = this.blockClassName;
		this.userCommentsBlock = document.querySelector('.comments__user-comments');
		this.userCommentsBlock.innerHTML = '';

		commentsStorage.forEach((userComment: Comment, index: number) => {
			if(userComment.answerIds.length){
				this.commentRendering(userComment, index);
				commentsStorage.filter((comment: Comment) => (
					userComment.answerIds.some((id: Id) => comment.id === id)))
						.map((comment: Comment) => this.commentRendering(comment, Math.random()))
			} else if(userComment.parentId === null || userComment.noParentForFavorite){
				this.commentRendering(userComment, index);
			}
		})
	}

	private commentRendering(userComment: Comment, index: number) {
		const commentBlock: HTMLDivElement = document.createElement('div');
		commentBlock.className = 'comments__comment comment';
		this.userCommentsBlock.append(commentBlock);

		this.rating = new Rating();
		this.toFavorite = new ToFavorite();
		this.answer = new Answer();
		const datatime: Date = new Date(userComment.dataComment);
		let answerToUserName: string;

		if(userComment.parentId){
			if(!userComment.noParentForFavorite){
				commentBlock.classList.add('comment_answer');
			}
			answerToUserName = getUserNameByParentId(userComment.parentId);
		}

		commentBlock.innerHTML += `
				<img class="comment__user_photo user_photo"
					src="${userComment.userPhoto}"></img>
				<div class="comment__user_name user_name">${userComment.userName}</div>
				<div class="comment__datetime">
					${datatime.toLocaleDateString().slice(0, 5)}
					${datatime.toLocaleTimeString().slice(0, 5)}
				</div>
				${userComment.parentId != null
					? `<div class="comment__answer-to">${answerToUserName}</div>`
					: ''}
				<div class="comment__text">${userComment.textComment}</div>
				<div id="option${index}" class="comment__options option"></div>`;

		const optionBlock = document.getElementById(`option${index}`);

		if(userComment.parentId === null) {
			optionBlock.append(this.answer.parentBlock);
			this.answer.rendering(userComment);
		}
		optionBlock.append(this.toFavorite.parentBlock);
		optionBlock.append(this.rating.parentBlock);
		this.toFavorite.rendering(userComment, +index);
		this.rating.rendering(userComment, +index);
	}
}