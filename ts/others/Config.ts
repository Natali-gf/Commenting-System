import { FavoriteComment } from "../enum/favorite";
import { RatingType } from "../enum/rating";

export type Id = `${string}-${string}-${string}-${string}-${string}`;
export type ParentElement = HTMLElement | HTMLDivElement | HTMLFormElement | HTMLButtonElement;
export type RatingVotes = {
	userId: Id,
	type: RatingType.Like | RatingType.Dislike,
}

export type Comment = {
	id: Id,
	parentId: Id | null,
	answerIds: Id[],
	userPhoto: string,
	userName: string,
	dataComment: Date,
	textComment: string,
	isFavorite: FavoriteComment,
	noParentForFavorite: boolean,
	rating: {
		currentRating: number,
		votes: RatingVotes[]
	}
}

export interface IBlock {
	parentBlock: ParentElement;
	blockClassName: string;
	rendering(comment?: Comment[] | Comment | string | number, index?: number): void;
}

export interface IEventBlock extends IBlock{
	events(): void;
}

export default class Config {
	maxMessageLength: number = 1000;
	defaultRating: number = 0;

	constructor(){
		// this.contentBlock = document.getElementById('content');
	}
}