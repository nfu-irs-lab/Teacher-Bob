"use strict";
var _a, _b;
//透過fetch在後台服務器獲取數據，透過第一個then將原始數據轉換成.json格式
const GetDataFromJson = fetch("http://127.0.0.1:5500/public/resourse/story.json").then((response) => response.json());
(_a = document
    .getElementById("function5")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", GoStorySelectPage);
(_b = document
    .getElementById("function5")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", LoadAllStoryFromJson);
function GoStorySelectPage() {
    open("http://127.0.0.1:5500/public/StorySelectPage.html");
}
function LoadAllStoryFromJson() {
    console.log(123);
}
//自動從json裡面獲取所有的故事，並加載進故事選擇的下拉式清單
GetDataFromJson.then(function (json) {
    let TotalAmountOfStory = json.length;
    for (let i = 0; i < TotalAmountOfStory; i++) {
        let Storylist = document.getElementById("Storylist");
        let StoryNameFromJson = document.createElement("option");
        StoryNameFromJson.setAttribute("value", "story" + (i + 1));
        StoryNameFromJson.textContent = json[i].chinesesubtitle;
        Storylist.appendChild(StoryNameFromJson);
    }
});
let StoryNum;
let PageCount = 0;
function GetInputStory() {
    const InputStory = document.getElementById("Storylist");
    StoryNum = Number(InputStory === null || InputStory === void 0 ? void 0 : InputStory.value.slice(5));
    return StoryNum - 1;
}
function InitializePage() {
    var _a, _b;
    //將第一層頁面隱藏，顯示第二層頁面
    (_a = document.getElementById("SelectPage")) === null || _a === void 0 ? void 0 : _a.setAttribute("style", "display:none");
    (_b = document.getElementById("WorkPage")) === null || _b === void 0 ? void 0 : _b.setAttribute("style", "display:block");
    //初始化語言選擇選單
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
let CurrentPageNumber = 0;
function ShowEnglishSubtitle() {
    let EnglishSubtitleShow = document.getElementById("EnglishSubtitle");
    if ((EnglishSubtitleShow === null || EnglishSubtitleShow === void 0 ? void 0 : EnglishSubtitleShow.style.display) == "none") {
        EnglishSubtitleShow.setAttribute("style", "display:block");
        let Showbutton = document.getElementById("ShowEnglishButton");
        Showbutton === null || Showbutton === void 0 ? void 0 : Showbutton.addEventListener("click", function () {
            let number = GetInputStory();
            GetDataFromJson.then(function (json) {
                StringfyJson(json[number].data.pages[CurrentPageNumber].text);
                let Target = document.getElementById("EnglishSubtitle");
                Target.innerHTML = StringfyJson(json[number].data.pages[CurrentPageNumber].text);
            });
        });
    }
    else {
        EnglishSubtitleShow === null || EnglishSubtitleShow === void 0 ? void 0 : EnglishSubtitleShow.setAttribute("style", "display:none");
    }
}
document.getElementById("NextPageButton").onclick = NestLine;
function NestLine() {
    let InputStoryNumber = GetInputStory();
    GetDataFromJson.then(function (json) {
        let Target = document.getElementById("EnglishSubtitle");
        let Storylength = json[InputStoryNumber].data.pages.length;
        if (CurrentPageNumber >= Storylength - 1) {
            CurrentPageNumber = Storylength - 1;
            Target.innerHTML = StringfyJson(json[InputStoryNumber].data.pages[CurrentPageNumber].text);
            console.log(CurrentPageNumber);
        }
        else {
            CurrentPageNumber++;
            Target.innerHTML = StringfyJson(json[InputStoryNumber].data.pages[CurrentPageNumber].text);
        }
    });
}
document.getElementById("LastPageButton").onclick = LastLine;
function LastLine() {
    let InputStoryNumber = GetInputStory();
    GetDataFromJson.then(function (json) {
        let Target = document.getElementById("EnglishSubtitle");
        if (CurrentPageNumber <= 0) {
            CurrentPageNumber = 0;
            Target.innerHTML = StringfyJson(json[InputStoryNumber].data.pages[CurrentPageNumber].text);
            console.log(CurrentPageNumber);
        }
        else {
            CurrentPageNumber--;
            Target.innerHTML = StringfyJson(json[InputStoryNumber].data.pages[CurrentPageNumber].text);
        }
    });
}
document.getElementById("PlayButton").onclick = Play;
function Play() {
    var _a;
    let ReadTarget = (_a = document.getElementById("EnglishSubtitle")) === null || _a === void 0 ? void 0 : _a.innerText;
    var msg = new SpeechSynthesisUtterance(ReadTarget);
    msg.rate = 1;
    let VoiceChoose = document.getElementById("LanguageSelect");
    let LanguageNumber = Number(VoiceChoose === null || VoiceChoose === void 0 ? void 0 : VoiceChoose.value);
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[LanguageNumber];
    window.speechSynthesis.speak(msg);
}
//# sourceMappingURL=StoryTelling.js.map