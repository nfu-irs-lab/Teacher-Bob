"use strict";
function goToLearnWord() {
    open('http://127.0.0.1:5500/public/learnWords.html'); //開啟learnWord的網址
}
let grabWord;
grabWord = Math.floor(Math.random() * 51); //利用亂數抓單字庫的單字
//目前單字庫有52組單字，如有新增記得改()後面的數字與此註記
console.log(grabWord);
//將vocabularies.json檔導入learnWord.ts
let a;
fetch("./resourse/vocabularies.json")
    .then((resourse) => resourse.json())
    .then((json) => a = (json[grabWord].data.name))
    .then((a) => console.log(a));
// fetch("./resourse/vocabularies.json") 
// .then((resourse) => resourse.json())
// .then((json) => console.log(json[grabWord].data.sentence));
// fetch("./resourse/vocabularies.json") 
// .then((resourse) => resourse.json())
// .then((json) => console.log(json[grabWord].data.languages[0].tr_name));
// fetch("./resourse/vocabularies.json") 
// .then((resourse) => resourse.json())
// .then((json) => console.log(json[grabWord].data.languages[0].tr_sentence));
//# sourceMappingURL=learnWords.js.map