import { FavoriteComment } from "../enum/favorite.js";
import { RatingType } from "../enum/rating.js";
import { Comment } from "../others/Config.js";
import { Id } from "../others/Config.js";

export function updateCommentsStorage(message: Comment): Comment[] {
	const commentsStorage = JSON.parse(localStorage.getItem('allTheComments'));
	commentsStorage.unshift(message);
	if(message.parentId) {
		for (const comment of commentsStorage) {
			if(comment.id === message.parentId) {
				comment.answerIds.unshift(message.id);
				comment.lastAnswer = message.dataComment;
				break;
			}
		}
	}
	localStorage.setItem('allTheComments', JSON.stringify(commentsStorage));

	return commentsStorage;
}

export function updateFavoriteStorage(comment: Comment): Comment[] {
	const commentsStorage = JSON.parse(localStorage.getItem('allTheComments'));
	const favoriteComments = JSON.parse(localStorage.getItem('favoriteComments'));

	for (const item of commentsStorage) {
		if(item.id === comment.id) {
			if(comment.isFavorite === FavoriteComment.In){
				item.isFavorite = FavoriteComment.In;
				favoriteComments.unshift(item);
			} else {
				item.isFavorite = FavoriteComment.Out;
				for (const index in favoriteComments) {
					if(favoriteComments[index].id === comment.id) {
						favoriteComments.splice(index, 1);
						break;
					}
				}
			}
			break;
		}
	}
	localStorage.setItem('allTheComments', JSON.stringify(commentsStorage));
	localStorage.setItem('favoriteComments', JSON.stringify(favoriteComments));

	return commentsStorage;
}

export function updateRatingComment(messageId: Id, changeTo: number, userId: Id, votedType: RatingType): Comment[] {
	const commentsStorage: Comment[] = JSON.parse(localStorage.getItem('allTheComments'));

	for (const comment of commentsStorage) {
		if(messageId === comment.id){
			if(votedType === RatingType.Neutral){
				for (const idx in comment.rating.votes) {
					if(comment.rating.votes[idx].userId === userId){
						comment.rating.votes.splice(+idx, 1)
					}
				}

			} else {
				comment.rating.votes.push({ userId: userId, type: votedType })
			}
			comment.rating.currentRating += changeTo;
			break;
		}
	}

	localStorage.setItem('allTheComments', JSON.stringify(commentsStorage));

	return commentsStorage;
}