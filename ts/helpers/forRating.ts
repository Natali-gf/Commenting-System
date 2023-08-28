import { RatingType } from "../enum/rating.js";
import { Comment, Id } from "../others/Config.js";

export function checkUserId(comment: Comment, userId: Id): RatingType {
	// console.log(comment.rating.votes)
	if(!comment.rating.votes.length) {
		return RatingType.Neutral;
	}

	for (const votes of comment.rating.votes) {
		if(votes.userId === userId) {
			return votes.type;
		}
	}

	return RatingType.Neutral;
}