import UserComments from "../commentsBlocks/UserComments.js";
import { IBlock, Id, Comment } from "../others/Config.js";
import User from "../others/User.js";
import { checkUserId } from "../helpers/forRating.js";
import { updateRatingComment } from "../helpers/storage.js";
import { RatingType } from "../enum/rating.js";

export class Rating implements IBlock {
	parentBlock: HTMLDivElement = document.createElement('div');
	blockClassName: string = 'option__rating rating';

	defaultRating: number = 0;
	rating: number;
	numberOfRatings: number;
	votedUsersIdInc: Id[];
	votedUsersIdDec: Id[];
	user: User;

	constructor(){
		this.user = new User();
	}

	public rendering(comment: Comment, key: number) {
		this.parentBlock.className = this.blockClassName;
		this.parentBlock.innerHTML = `
				<button id="btnDec${key}" class="rating__decrement"></button>
				<div class="rating__currentNumber">${comment.rating.currentRating}</div>
				<button id="btnInc${key}" class="rating__increment"></button>`;

		this.addEvents(comment, key);
	}

	private addEvents(comment: Comment, key: number) {
		document.getElementById(`btnDec${key}`)
				.addEventListener('click', () => this.ratingDecrement(comment));

		document.getElementById(`btnInc${key}`)
				.addEventListener('click', () => this.ratingIncrement(comment));
	}

	public ratingDecrement(comment: Comment) {
		const isUserVoted = checkUserId(comment, this.user.userId);
		let commentsStorage: Comment[];

		if (isUserVoted === RatingType.Dislike){
			return;
		} else if(isUserVoted === RatingType.Like){
			commentsStorage = updateRatingComment(comment.id, -1, this.user.userId, RatingType.Neutral);
		} else {
			commentsStorage = updateRatingComment(comment.id, -1, this.user.userId, RatingType.Dislike);
		}

		this.updateComments(commentsStorage);
	}

	public ratingIncrement(comment: Comment) {
		const isUserVoted = checkUserId(comment, this.user.userId);
		let commentsStorage: Comment[];

		if (isUserVoted === RatingType.Like){
			return;
		} else if(isUserVoted === RatingType.Dislike){
			commentsStorage = updateRatingComment(comment.id, +1, this.user.userId, RatingType.Neutral);
		} else {
			commentsStorage = updateRatingComment(comment.id, +1, this.user.userId, RatingType.Like);
		}

		this.updateComments(commentsStorage);
	}

	updateComments(commentsStorage: Comment[]){
		const comments = new UserComments();
		comments.rendering(commentsStorage);
	}
}