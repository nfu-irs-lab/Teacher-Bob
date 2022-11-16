import * as express from "express";
import * as config from "./vocabuiaries.json";

const app = express();

app.listen(config.server.nodePort, () => {
  console.log(`Listening on port ${config.server.nodePort} ...`);
});

//let word :String = JSON.parse()//引入Vocabularies.json
let grabWord : number
grabWord = Math.floor(Math.random()*73)//利用亂數抓單字庫的單字
//console.log(arr_card[grabWord]);


