"use strict";
function GoTolearnWord() {
    open("http://127.0.0.1:5500/public/learnWords.html");
}
const GetDataFromJson1 = fetch("http://127.0.0.1:5500/public/resourse/vocabularies.json").then((response) => response.json());
let grabWord;
//自動獲取瀏覽器內建語音包
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
let CurrentVacNumber = 0;
document.getElementById("NextVacButton").onclick = NestVac;
function NestVac() {
    let InputStoryNumber = GetInputStoryNumber();
    GetDataFromJson.then(function (json) {
        let Storylength = json[InputStoryNumber].data.pages.length;
        //判斷邊界
        if (CurrentPageNumber >= Storylength - 1)
            ShowCurrentPageEnglishSubtitle(CurrentPageNumber);
        else
            ShowCurrentPageEnglishSubtitle(CurrentPageNumber++);
    });
}
//# sourceMappingURL=learnWords.js.map