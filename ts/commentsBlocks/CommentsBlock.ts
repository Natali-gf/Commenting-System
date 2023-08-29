import UserComments from "./UserComments.js";
import CommentsHeader from "./CommentsHeader.js";
import { IBlock } from "../others/Config.js";
import FormBlock from "./FormBlock.js";

export default class CommentsBlock implements IBlock {
	public _parentBlock: HTMLDivElement = document.createElement('div');
	private blockClassName: string = 'comments content__comments';
	private commentsHeader: CommentsHeader;
	private formBlock: FormBlock;
	private userComments: UserComments;

	public constructor() {
		this.commentsHeader = new CommentsHeader();
		this.formBlock = new FormBlock();
		this.userComments = new UserComments();
	}

	public rendering(): void {
		this._parentBlock.className = this.blockClassName;
		this._parentBlock.append(this.commentsHeader.parentBlock);
		this._parentBlock.append(this.formBlock.parentBlock);
		this._parentBlock.append(this.userComments.parentBlock);
		this.commentsHeader.rendering();
		FormBlock.rendering();
		UserComments.rendering(JSON.parse(localStorage.getItem('allTheComments')));
	}

	public get parentBlock(): HTMLDivElement {
		return this._parentBlock;
	}
}