import { IBlock } from "../others/Config.js";
import { SortBy } from "../enum/sort.js"

export default class Sort implements IBlock {
	parentBlock: HTMLDivElement = document.createElement('div');
	blockClassName: string = 'comments__sort sort';

	public rendering() {
		this.parentBlock.className = this.blockClassName;
		this.parentBlock.innerHTML = `
				<h4 class="sort__title">По количеству оценок</h4>
				<button class="sort__order"></button>
				<ul class="sort__list hidden"></ul>`;

		const sortList: HTMLUListElement = document.querySelector('.sort__list');
		for (const key in SortBy) {
			sortList.innerHTML += `
				<li class="sort__item">
					<input id="${key}" class="sort__input" type="radio" name="sort">
					<label for="${key}" class="sort__label">${SortBy[key]}</label>
				</li>`
		}

		this.addEvents(sortList);
	}

	private addEvents(sortList: HTMLUListElement){
		this.parentBlock.addEventListener('click', () => {
			sortList.classList.toggle('hidden');
			console.log()
		})
	}

	public sortBy(){
		
	}
}