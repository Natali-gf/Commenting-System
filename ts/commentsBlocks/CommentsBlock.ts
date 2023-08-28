import UserComments from "./UserComments.js";
import CommentsHeader from "./CommentsHeader.js";
import { IBlock } from "../others/Config.js";
import FormBlock from "./FormBlock.js";

export default class CommentsBlock implements IBlock {
	parentBlock: HTMLDivElement = document.createElement('div');
	blockClassName: string = 'comments content__comments';
	commentsHeader: CommentsHeader;
	formBlock: FormBlock;
	userComments: UserComments;

	constructor(){
		this.commentsHeader = new CommentsHeader();
		this.formBlock = new FormBlock();
		this.userComments = new UserComments()
	}

	public rendering(){
		this.parentBlock.className = this.blockClassName;
		this.parentBlock.append(this.commentsHeader.parentBlock);
		this.parentBlock.append(this.formBlock.parentBlock);
		this.parentBlock.append(this.userComments.parentBlock);
		this.commentsHeader.rendering();
		this.formBlock.rendering();
		this.userComments.rendering(JSON.parse(localStorage.getItem('allTheComments')));
	}
}