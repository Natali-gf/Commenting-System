import { Comment, IBlock } from "../others/Config.js";
import { SortType, OrderBy } from "../enum/sort.js"
import UserComments from "../commentsBlocks/UserComments.js";
import Favorite from "./Favorite.js";

type SortName = {
	[SortType.Date]: string
	[SortType.Rating]: string
	[SortType.Relevance]: string
	[SortType.Answers]: string
}
const SortTypeName: SortName = {
	[SortType.Date]: 'By date',
	[SortType.Rating]: 'By rating',
	[SortType.Relevance]: 'By relevance',
	[SortType.Answers]: 'By number of answers'
}

export default class Sort implements IBlock {
	public _parentBlock: HTMLDivElement = document.createElement('div');
	private blockClassName: string = 'comments__sort sort';
	private currentOrderBy: OrderBy = OrderBy.Desc;
	private currentSortType: SortType = SortType.Date;

	public rendering() {
		this._parentBlock.className = this.blockClassName;
		const renderedBlock = document.querySelector(`.sort`);
		renderedBlock.innerHTML = `
				<h4 class="sort__title">${SortTypeName[this.currentSortType]}</h4>
				<button class="sort__order sort__order_${this.currentOrderBy}"></button>
				<ul class="sort__list hidden"></ul>`;

		const sortTitle: HTMLElement = document.querySelector('.sort__title');
		const orderBtn: HTMLButtonElement = document.querySelector('.sort__order');
		const sortList: HTMLUListElement = document.querySelector('.sort__list');

		for (const key in SortTypeName) {
			sortList.innerHTML += `
				<li class="sort__item">
					<input id="sort${key}" class="sort__input" type="radio" name="sortType">
					<label for="sort${key}" class="sort__label">${SortTypeName[key]}</label>
				</li>`

		}

		const defaultCheck: HTMLInputElement = <HTMLInputElement>document.getElementById(`sort${this.currentSortType}`)
		defaultCheck.checked = true;

		this.addEvents(sortList, orderBtn, sortTitle);
	}

	private addEvents(sortList: HTMLUListElement, orderBtn: HTMLButtonElement, sortTitle: HTMLElement): void {
		sortTitle.addEventListener('click', (): void => {
			sortList.classList.toggle('hidden');
		})

		sortList.addEventListener('click', (e: Event): void => {
			sortList.classList.add('hidden');

			const target: HTMLElement = <HTMLElement>e.target;
			if(target.id){
				this.currentSortType = +target.id.slice(-1);
				this.rendering();

				let commentsStorage = Favorite.useFavorite
									? JSON.parse(localStorage.getItem('favoriteComments'))
									: JSON.parse(localStorage.getItem('allTheComments'));
			this.sortBy(commentsStorage);
			}
		});

		orderBtn.addEventListener('click', (): void => {
			if(this.currentOrderBy === OrderBy.Desc){
				orderBtn.classList.add('sort__order_0');
				orderBtn.classList.remove('sort__order_1');
				this.currentOrderBy = OrderBy.Ask;
			} else {
				orderBtn.classList.add('sort__order_1');
				orderBtn.classList.remove('sort__order_0');
				this.currentOrderBy = OrderBy.Desc;
			}

			let commentsStorage = Favorite.useFavorite
									? JSON.parse(localStorage.getItem('favoriteComments'))
									: JSON.parse(localStorage.getItem('allTheComments'));
			this.sortBy(commentsStorage);
		})
	}

	public sortBy(commentsStorage: Comment[]): void {

		switch (this.currentSortType) {
			case SortType.Date:
				if(this.currentOrderBy === OrderBy.Desc) {
					commentsStorage.sort((a: Comment, b: Comment) => {
						if(b.dataComment < a.dataComment) return -1
						if(b.dataComment > a.dataComment) return 1
						return 0;
					});
				} else {
					commentsStorage.sort((a: Comment, b: Comment) => {
						if(b.dataComment > a.dataComment) return -1
						if(b.dataComment < a.dataComment) return 1
						return 0;
					});
				}
				break;
			case SortType.Rating:
				if(this.currentOrderBy === OrderBy.Desc) {
					commentsStorage.sort((a: Comment, b: Comment) =>
						(b.rating.currentRating - a.rating.currentRating));
				} else {
					commentsStorage.sort((a: Comment, b: Comment) =>
						(a.rating.currentRating - b.rating.currentRating));
				}
				break;
			case SortType.Relevance:
				if(this.currentOrderBy === OrderBy.Desc) {
					commentsStorage.sort((a: Comment, b: Comment) => {
						if(b.lastAnswer < a.lastAnswer) return -1
						if(b.lastAnswer > a.lastAnswer) return 1
						return 0;
					});
				} else {
					commentsStorage.sort((a: Comment, b: Comment) => {
						if(b.lastAnswer > a.lastAnswer) return -1
						if(b.lastAnswer < a.lastAnswer) return 1
						return 0;
					});
				}
				break;
			case SortType.Answers:
				if(this.currentOrderBy === OrderBy.Desc) {
					commentsStorage.sort((a: Comment, b: Comment) =>
						(b.answerIds.length - a.answerIds.length));
				} else {
					commentsStorage.sort((a: Comment, b: Comment) =>
						(a.answerIds.length - b.answerIds.length));
				}
				break;
			default:
				break;
		}

		UserComments.rendering(commentsStorage);
		Favorite.useFavorite
			? localStorage.setItem('favoriteComments', JSON.stringify(commentsStorage))
			: localStorage.setItem('allTheComments', JSON.stringify(commentsStorage));
	}

	public get parentBlock(): HTMLDivElement {
		return this._parentBlock;
	}
}