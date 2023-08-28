import CommentsBlock from "./commentsBlocks/CommentsBlock.js";
import Config from "./others/Config.js";
import { startComments } from "./data/data.js";
import Aside from "./mainBlocks/Aside.js";
import Body from "./mainBlocks/Body.js";

// localStorage.clear();
const config: Config = new Config();
const body: Body = new Body();
body.rendering();
// const aside: Aside = new Aside();
// aside.rendering(config.body);
// const commentsBlock: CommentsBlock = new CommentsBlock();
// commentsBlock.createBlockOfComments(config.contentBlock);
// let uuid = self.crypto.randomUUID();
// console.log(uuid);
// let dat= new Date('2023-08-21T18:40+03:00')
// console.log(dat, dat.toLocaleDateString());
// console.log(JSON.parse(sessionStorage.getItem('comments')))
// sessionStorage.clear();