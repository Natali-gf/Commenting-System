import { startComments } from "./data/data.js";
import { changeUserPhoto } from "./helpers/forUsers.js";
import Body from "./mainBlocks/Body.js";
// localStorage.clear()
const body: Body = new Body();
changeUserPhoto(startComments).then((data) => {
	body.checkLocalStorage(data);
	body.rendering();
});
