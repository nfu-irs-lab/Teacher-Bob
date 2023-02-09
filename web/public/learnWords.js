"use strict";
function goToLearnWord() {
    open('http://127.0.0.1:5500/public/learnWords.html'); //開啟learnWord的網址
}
let grabWord;
let StoryNum1;
const GetDataFromJson1 = fetch("http://127.0.0.1:5500/public/resourse/vocabularies.json").then((response) => response.json());
function GetInputStory1() {
    const InputStory = document.getElementById("Storylist");
    StoryNum1 = Number(InputStory === null || InputStory === void 0 ? void 0 : InputStory.value.slice(5));
    return StoryNum1 - 1;
}
let EngSubState1 = false;
function ChangeState1() {
    var _a, _b;
    if (EngSubState1 == false) {
        (_a = document
            .getElementById("EnglishSubtitle")) === null || _a === void 0 ? void 0 : _a.setAttribute("style", "display:block");
        EngSubState1 = true;
    }
    else {
        (_b = document
            .getElementById("EnglishSubtitle")) === null || _b === void 0 ? void 0 : _b.setAttribute("style", "display:none");
        EngSubState1 = false;
    }
}
grabWord = Math.floor(Math.random() * 51); //利用亂數抓單字庫的單字
//目前單字庫有52組單字，如有新增記得改()後面的數字與此註記
console.log(grabWord);
function StringfyJson1(JsonWords) {
    let StringfyJsonWord = JSON.stringify(JsonWords);
    let ParseJsonWord = JSON.parse(StringfyJsonWord);
    return ParseJsonWord;
}
let CurrentPageNumber1 = 0;
function ShowLearnWord() {
    let EnglishSubtitleShow = document.getElementById("EnglishSubtitle");
    if ((EnglishSubtitleShow === null || EnglishSubtitleShow === void 0 ? void 0 : EnglishSubtitleShow.style.display) == "none") {
        EnglishSubtitleShow.setAttribute("style", "display:block");
        let Showbutton = document.getElementById("ShowButton");
        Showbutton === null || Showbutton === void 0 ? void 0 : Showbutton.addEventListener("click", function () {
            let grabWord = GetInputStory1();
            GetDataFromJson1.then(function (json) {
                StringfyJson1(json[grabWord].data.languages[CurrentPageNumber1].tr_name.text);
                let Target = document.getElementById("EnglishSubtitle");
                Target.innerHTML = StringfyJson1(json[grabWord].data.languages[CurrentPageNumber1].tr_name.text);
            });
        });
    }
    else {
        EnglishSubtitleShow === null || EnglishSubtitleShow === void 0 ? void 0 : EnglishSubtitleShow.setAttribute("style", "display:none");
    }
}
console.log(StringfyJson1);
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