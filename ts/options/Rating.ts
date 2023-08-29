import UserComments from "../commentsBlocks/UserComments.js";
import { IBlock, Comment } from "../others/Config.js";
import User from "../others/User.js";
import { checkUserId } from "../helpers/forRating.js";
import { updateRatingComment } from "../helpers/storage.js";
import { RatingType } from "../enum/rating.js";

export class Rating implements IBlock {
	public _parentBlock: HTMLDivElement = document.createElement('div');
	private blockClassName: string = 'option__rating rating';

	public rendering(comment: Comment, key: number): void {
		this._parentBlock.className = this.blockClassName;
		this._parentBlock.innerHTML = `
				<button id="btnDec${key}" class="rating__decrement"></button>
				<div class="rating__currentNumber">${comment.rating.currentRating}</div>
				<button id="btnInc${key}" class="rating__increment"></button>`;

		this.addEvents(comment, key);
	}

	private addEvents(comment: Comment, key: number): void {
		document.getElementById(`btnDec${key}`)
				.addEventListener('click', () => this.ratingDecrement(comment));

		document.getElementById(`btnInc${key}`)
				.addEventListener('click', () => this.ratingIncrement(comment));
	}

	public ratingDecrement(comment: Comment): void {
		const isUserVoted = checkUserId(comment, User._userId);
		let commentsStorage: Comment[];

		if (isUserVoted === RatingType.Dislike){
			return;
		} else if(isUserVoted === RatingType.Like){
			commentsStorage = updateRatingComment(comment.id, -1, User._userId, RatingType.Neutral);
		} else {
			commentsStorage = updateRatingComment(comment.id, -1, User._userId, RatingType.Dislike);
		}

		UserComments.rendering(commentsStorage);
	}

	public ratingIncrement(comment: Comment): void {
		const isUserVoted = checkUserId(comment, User._userId);
		let commentsStorage: Comment[];

		if (isUserVoted === RatingType.Like){
			return;
		} else if(isUserVoted === RatingType.Dislike){
			commentsStorage = updateRatingComment(comment.id, +1, User._userId, RatingType.Neutral);
		} else {
			commentsStorage = updateRatingComment(comment.id, +1, User._userId, RatingType.Like);
		}

		UserComments.rendering(commentsStorage);
	}


	public get parentBlock(): HTMLDivElement {
		return this._parentBlock;
	}
}