"use strict";
function GoStorySelectPage() {
    open("http://127.0.0.1:5500/public/StorySelectPage.html");
}
let StoryNum;
let PageCount = 0;
//透過fetch在後台服務器獲取數據，透過第一個then將原始數據轉換成.json格式
const GetDataFromJson = fetch("http://127.0.0.1:5500/public/resourse/story.json").then((response) => response.json());
function GetInputStory() {
    const InputStory = document.getElementById("Storylist");
    StoryNum = Number(InputStory === null || InputStory === void 0 ? void 0 : InputStory.value.slice(5));
    return StoryNum - 1;
}
function InitializePage() {
    var _a, _b;
    (_a = document.getElementById("SelectPage")) === null || _a === void 0 ? void 0 : _a.setAttribute("style", "display:none");
    (_b = document.getElementById("WorkPage")) === null || _b === void 0 ? void 0 : _b.setAttribute("style", "display:block");
}
let EngSubState = false;
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
function StringfyJson(JsonWords) {
    let StringfyJsonWord = JSON.stringify(JsonWords);
    let ParseJsonWord = JSON.parse(StringfyJsonWord);
    return ParseJsonWord;
}
let PageNumber = 0;
function ShowEnglishSubtitle() {
    let EnglishSubtitleShow = document.getElementById("EnglishSubtitle");
    if ((EnglishSubtitleShow === null || EnglishSubtitleShow === void 0 ? void 0 : EnglishSubtitleShow.style.display) == "none") {
        EnglishSubtitleShow.setAttribute("style", "display:block");
        let Showbutton = document.getElementById("ShowEnglishButton");
        Showbutton === null || Showbutton === void 0 ? void 0 : Showbutton.addEventListener("click", function () {
            let number = GetInputStory();
            GetDataFromJson.then(function (json) {
                StringfyJson(json[number].data.pages[PageNumber].text);
                let Target = document.getElementById("EnglishSubtitle");
                Target.innerHTML = StringfyJson(json[number].data.pages[PageNumber].text);
            });
        });
    }
    else {
        EnglishSubtitleShow === null || EnglishSubtitleShow === void 0 ? void 0 : EnglishSubtitleShow.setAttribute("style", "display:none");
    }
}
function NestLine() {
    var _a;
    PageNumber++;
    (_a = document
        .getElementById("NextPageButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        let number = GetInputStory();
        GetDataFromJson.then(function (json) {
            let Target = document.getElementById("EnglishSubtitle");
            if (PageNumber < json[number].data.pages.length) {
                Target.innerHTML = StringfyJson(json[number].data.pages[PageNumber].text);
                console.log(PageNumber);
            }
            else {
                PageNumber = json[number].data.pages.length - 1;
                Target.innerHTML = StringfyJson(json[number].data.pages[PageNumber].text);
            }
        });
    });
}
function LastLine() {
    var _a;
    PageNumber--;
    (_a = document
        .getElementById("LastPageButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        let number = GetInputStory();
        GetDataFromJson.then(function (json) {
            if (PageNumber < 0) {
                PageNumber = 0;
                let Target = document.getElementById("EnglishSubtitle");
                Target.innerHTML = StringfyJson(json[number].data.pages[PageNumber].text);
            }
            else {
                let Target = document.getElementById("EnglishSubtitle");
                Target.innerHTML = StringfyJson(json[number].data.pages[PageNumber].text);
                console.log(PageNumber);
            }
        });
    });
}
function Play() {
    var _a;
    let Target = (_a = document.getElementById("EnglishSubtitle")) === null || _a === void 0 ? void 0 : _a.innerHTML;
    var msg = new SpeechSynthesisUtterance(Target);
    msg.rate = 0.7;
    speechSynthesis.addEventListener("voiceschanged", function () {
        var voices = window.speechSynthesis.getVoices();
        console.log(voices);
        var ChoosenVoice = voices.find((voice) => voice.voiceURI === "Google 國語（臺灣）");
        console.log(1);
        msg.voice = voices[5];
        speechSynthesis.speak(msg);
    });
}
// var voices = window.speechSynthesis.getVoices();
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
//# sourceMappingURL=StoryTelling.js.map