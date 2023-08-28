import { Comment } from "../others/Config";
import { Id } from "../others/Config.js";

export function getUserNameByParentId(parentId: Id, commentsStorage: Comment[]): string {
	for (const key in commentsStorage) {
		if(parentId === commentsStorage[key].id) {
			return commentsStorage[key].userName;
		}
	}
}