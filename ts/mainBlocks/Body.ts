import Aside from "./Aside.js";
import Header from "./Header.js";
import Main from "./Main.js";

export default class Body {
	body: HTMLBodyElement;
	aside: Aside;
	header: Header;
	main: Main;

	constructor() {
		this.body = document.querySelector('.wrapper');
		this.aside = new Aside();
		this.header = new Header();
		this.main = new Main();
	}

	public rendering(){
		this.body.append(this.header.parentBlock);
		this.body.append(this.aside.parentBlock);
		this.body.append(this.main.parentBlock);
		this.header.rendering();
		this.aside.rendering();
		this.main.rendering();
	}
}