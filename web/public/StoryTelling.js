"use strict";
var _a, _b;
function GoStorySelectPage() {
    open("http://127.0.0.1:5500/public/StorySelectPage.html");
}
let StoryNum;
let PageCount = 0;
let EngSubState = false;
//透過fetch在後台服務器獲取數據，透過第一個then將原始數據轉換成.json格式
const GetDataFromJson = fetch("http://127.0.0.1:5500/public/resourse/story.json").then((response) => response.json());
function PromiseToString(promise) {
    let tem = JSON.stringify(promise);
    let result = JSON.parse(tem);
    return result;
}
function GetInputStoryNum() {
    const InputStory = document.getElementById("Storylist");
    StoryNum = Number(InputStory === null || InputStory === void 0 ? void 0 : InputStory.value.slice(5));
    console.log("story" + StoryNum);
    return StoryNum;
}
function InitializePage() {
    var _a, _b;
    (_a = document.getElementById("FirstPage")) === null || _a === void 0 ? void 0 : _a.setAttribute("style", "display:none");
    (_b = document.getElementById("SecondPage")) === null || _b === void 0 ? void 0 : _b.setAttribute("style", "display:block");
}
function ChangeState() {
    var _a, _b;
    if (EngSubState == false) {
        (_a = document
            .getElementById("EnglishSubtitle")) === null || _a === void 0 ? void 0 : _a.setAttribute("style", "display:block");
        EngSubState = true;
    }
    else {
        (_b = document
            .getElementById("EnglishSubtitle")) === null || _b === void 0 ? void 0 : _b.setAttribute("style", "display:none");
        EngSubState = false;
    }
}
let btn1 = document.getElementById("EnglishSubtitle");
if (btn1 != null)
    btn1.onclick = ChangeState;
let CheckStoryNum = () => {
    GetDataFromJson.then(function (json) {
        for (let i = 0; i < json.length; i++) {
            if (json[i].id == `story${i + 1}`) {
                return i;
            }
        }
    });
};
// async function GetStoryNumber() {
//   let storynum = await GetDataFromJson;
// }
// document.getElementById(InputStory?.value as string)?.addEventListener("click", () => {
//     console.log(InputStory?.value);
//     // 關閉故事選擇介面
//     let StoryList = document.getElementById("storylist");
//     StoryList?.setAttribute("style", "display:none");
//     // 開啟英文字幕
//     const OpenEnglishSubtitle = document.getElementById("EnglishSubtitle");
//     OpenEnglishSubtitle?.setAttribute("style", "display:block");
//     if (OpenEnglishSubtitle != null) OpenEnglishSubtitle.innerHTML = "123";
//     // 開啟中文字幕
//     const OpenChineseButton = document.getElementById("ChineseSubtitle");
//     OpenChineseButton?.setAttribute("style", "display:block");
//     if (OpenChineseButton != null) OpenChineseButton.innerHTML = "456";
//     // open("./StoryLib/story1.txt");
//   });
(_a = document.getElementById("text")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => { });
const synth = window.speechSynthesis;
const utter = new SpeechSynthesisUtterance();
utter.text = (_b = document.getElementById("function5")) === null || _b === void 0 ? void 0 : _b.innerText;
const speak = () => synth.speak(utter);
//# sourceMappingURL=StoryTelling.js.map