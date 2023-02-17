"use strict";
//開啟learnWord的網址
function goToLearnWord() {
    open('http://127.0.0.1:5500/public/learnWords.html');
}
let grabWord;
<<<<<<< HEAD
//利用亂數抓單字庫的單字
grabWord = Math.floor(Math.random() * 51); //待改
console.log(grabWord);
const GetDataFromJson1 = fetch("http://127.0.0.1:5500/public/resourse/vocabularies.json").then((response) => response.json());
function StringConvertJson(JsonWords) {
    let StringfyJsonWord = JSON.stringify(JsonWords);
    let ParseJsonWord = JSON.parse(StringfyJsonWord);
    return ParseJsonWord;
}
speechSynthesis.addEventListener("voiceschanged", function () {
    let LanguageOption = window.speechSynthesis.getVoices();
    console.log(LanguageOption);
    for (let i = 0; i < LanguageOption.length; i++) {
        let LanguageSelect = document.getElementById("LanguageSelect");
        let OptionFromBrowser = document.createElement("option");
        OptionFromBrowser.setAttribute("value", "" + i);
        OptionFromBrowser.textContent = LanguageOption[i].name;
        LanguageSelect.appendChild(OptionFromBrowser);
    }
});
GetDataFromJson1.then(function (json) {
    let TotalAmountOfVac = json.length;
    for (let i = 0; i < TotalAmountOfVac; i++) {
        let Vaclist = document.getElementById("VacSelect");
        let VacNameFromJson = document.createElement("option");
        VacNameFromJson.setAttribute("value", "單字" + (i + 1));
        VacNameFromJson.textContent = json[i].id;
        Vaclist.appendChild(VacNameFromJson);
    }
});
function GetInputWordNumber() {
    const InputStory = document.getElementById("Storylist");
    StoryNum = Number(InputStory === null || InputStory === void 0 ? void 0 : InputStory.value.slice(5));
    return StoryNum - 1;
} //不需要用
let CurrentVacNumber = 0;
document.getElementById("NextVacButton").onclick = NestVac;
function NestVac() {
    let InputWordNumber = GetInputWordNumber();
    GetDataFromJson.then(function (json) {
        let Storylength = json[InputWordNumber].data.pages.length;
        //判斷邊界
        if (CurrentPageNumber >= Storylength - 1)
            ShowCurrentPageEnglishSubtitle(CurrentPageNumber);
        else
            ShowCurrentPageEnglishSubtitle(CurrentPageNumber++);
    });
}
function ShowCurrentPageEnglishSubtitle(CurrentPageNumber) {
    throw new Error("Function not implemented.");
}
=======
grabWord = Math.floor(Math.random() * 51); //利用亂數抓單字庫的單字
//目前單字庫有52組單字，如有新增記得改()後面的數字與此註記
console.log(grabWord);
//將vocabularies.json檔導入learnWord.ts
let a;
fetch("./resourse/vocabularies.json")
    .then((resourse) => resourse.json())
    .then((json) => a = (json[grabWord].data.name))
    .then((a) => console.log(a));
>>>>>>> parent of c56ade1 (解決 cannot read properties of undefined就可以完成功能)
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