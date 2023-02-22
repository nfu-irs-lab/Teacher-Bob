"use strict";
//開啟learnWord的網址
function goToLearnWord() {
    open('http://127.0.0.1:5500/public/learnWords.html');
}
function StringJson(JsonWords) {
    let StringfyJsonWord = JSON.stringify(JsonWords);
    let ParseJsonWord = JSON.parse(StringfyJsonWord);
    return ParseJsonWord;
}
const GetDataFromJson1 = fetch("http://127.0.0.1:5500/public/resourse/vocabularies.json").then((response) => response.json());
let grabWord = 0;
//利用亂數抓單字庫的單字
function GetInputWordNumber() {
    grabWord = Math.floor(Math.random() * 51); //待改
    console.log(grabWord);
    return grabWord;
}
//語言選單
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
document.getElementById("ShowEngWordButton").onclick = ShowEnglishWordtitle;
function ShowEnglishWordtitle() {
    let TheEngWordtitle = document.getElementById("EnglishWordtitle");
    let TheChinWordtitle = document.getElementById("ChineseWordtitle");
    // let TheEngSentencetitle = document.getElementById("EnglishSentencetitle");
    // let TheChinSentencetitle = document.getElementById("ChineseSentencetitle");
    let InputWordNumber = GetInputWordNumber();
    let TargetEngWord = document.getElementById("EnglishWordtitle");
    let TargetChinWord = document.getElementById("ChineseWordtitle");
    let TargetEngSentence = document.getElementById("EnglishSentencetitle");
    let TargetChinSentence = document.getElementById("ChineseSentencetitle");
    if ((TheEngWordtitle === null || TheEngWordtitle === void 0 ? void 0 : TheEngWordtitle.style.display) == "none" || (TheEngWordtitle === null || TheEngWordtitle === void 0 ? void 0 : TheEngWordtitle.innerHTML) == null) {
        TheEngWordtitle.setAttribute("style", "display:block");
        TargetEngSentence.setAttribute("style", "display:block");
        GetDataFromJson1.then(function (json) {
            // 英文單字顯示
            let CurrentPageEngWord = json[InputWordNumber].data.name;
            TargetEngWord.innerHTML = StringJson(CurrentPageEngWord);
            console.log(CurrentPageEngWord);
            // 顯示英文例句
            let CurrentPageEngSentence = json[InputWordNumber].data.sentence;
            TargetEngSentence.innerHTML = StringJson(CurrentPageEngSentence);
            console.log(CurrentPageEngSentence);
            // 中文單字翻譯
            let CurrentPageChinWord = json[InputWordNumber].data.languages[0].tr_name;
            TargetChinWord.innerHTML = StringJson(CurrentPageChinWord);
            // 中文例句翻譯
            let CurrentPageChinSentence = json[InputWordNumber].data.languages[0].tr_sentence;
            TargetChinSentence.innerHTML = StringJson(CurrentPageChinSentence);
            // 顯示中文單字翻譯與例句翻譯
            document.getElementById("ShowChinWordButton").onclick = ShowChineseWordtitle;
            function ShowChineseWordtitle() {
                var _a, _b;
                if ((TheEngWordtitle === null || TheEngWordtitle === void 0 ? void 0 : TheEngWordtitle.style.display) == "block" || (TheEngWordtitle === null || TheEngWordtitle === void 0 ? void 0 : TheEngWordtitle.innerHTML) == null) {
                    if ((TheChinWordtitle === null || TheChinWordtitle === void 0 ? void 0 : TheChinWordtitle.style.display) == "none" || (TheChinWordtitle === null || TheChinWordtitle === void 0 ? void 0 : TheChinWordtitle.innerHTML) == null) {
                        TheChinWordtitle.setAttribute("style", "display:block");
                        (_a = document.getElementById("ChineseWordtitle")) === null || _a === void 0 ? void 0 : _a.setAttribute("style", "display:block");
                        TargetChinSentence.setAttribute("style", "display:block");
                        (_b = document.getElementById("ChineseSentencetitle")) === null || _b === void 0 ? void 0 : _b.setAttribute("style", "display:block");
                    }
                    else {
                        TheChinWordtitle === null || TheChinWordtitle === void 0 ? void 0 : TheChinWordtitle.setAttribute("style", "display:none");
                        TargetChinSentence === null || TargetChinSentence === void 0 ? void 0 : TargetChinSentence.setAttribute("style", "display:none");
                    }
                }
                else {
                    TheChinWordtitle === null || TheChinWordtitle === void 0 ? void 0 : TheChinWordtitle.setAttribute("style", "display:none");
                    TargetChinSentence === null || TargetChinSentence === void 0 ? void 0 : TargetChinSentence.setAttribute("style", "display:none");
                }
            }
        });
    }
    else {
        TheEngWordtitle === null || TheEngWordtitle === void 0 ? void 0 : TheEngWordtitle.setAttribute("style", "display:none");
        TheChinWordtitle === null || TheChinWordtitle === void 0 ? void 0 : TheChinWordtitle.setAttribute("style", "display:none");
        TargetEngSentence === null || TargetEngSentence === void 0 ? void 0 : TargetEngSentence.setAttribute("style", "display:none");
        TargetChinSentence === null || TargetChinSentence === void 0 ? void 0 : TargetChinSentence.setAttribute("style", "display:none");
    }
}
//# sourceMappingURL=learnWords.js.map