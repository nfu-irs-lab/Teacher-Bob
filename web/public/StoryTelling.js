"use strict";
var _a, _b;
function GoStorySelectPage() {
    open("http://127.0.0.1:5500/public/StorySelectPage.html");
}
// 獲取使用者選擇的故事
function GetInputStory() {
    const InputStory = document.getElementById("Storylist");
    if (typeof InputStory != null) {
        InitializePage(InputStory);
    }
    else
        alert("找不到故事");
}
function InitializePage(TitleName) {
    // 顯示故事中英文標題
    const title = document.getElementById("title");
    if (title != null)
        title.innerHTML = TitleName.value + "<br>";
    console.log(TitleName.value);
    let obj = JSON.parse('{"text":"string"}');
    console.log(obj.text);
}
// const mode = require("./StoryLib/text.json");
// for (let i = 0; i < mode.length; i++) {
//   console.log(mode[i]);
// }
fetch("./resourse/story.json")
    .then((response) => response.json())
    .then((json) => console.log(json[0].id));
// document
//   .getElementById(InputStory?.value as string)
//   ?.addEventListener("click", () => {
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