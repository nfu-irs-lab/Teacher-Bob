<<<<<<< HEAD
//開啟learnWord的網址
function goToLearnWord(){
    open('http://127.0.0.1:5500/public/learnWords.html')
    }
    
    function StringJson(JsonWords: string): string {
    let StringfyJsonWord = JSON.stringify(JsonWords);
    let ParseJsonWord: string = JSON.parse(StringfyJsonWord);
    return ParseJsonWord;
    }

    const GetDataFromJson1 = fetch(
        "http://127.0.0.1:5500/public/resourse/vocabularies.json"
        ).then((response) => response.json());

    let grabWord : number = 0
     //利用亂數抓單字庫的單字
    function GetInputWordNumber(): number{
    grabWord = Math.floor(Math.random()*51)//待改
    console.log(grabWord)
    return grabWord
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
          LanguageSelect!.appendChild(OptionFromBrowser);
        }
      });
      
      GetDataFromJson1.then(function (json) {
        let TotalAmountOfVac = json.length;
        for (let i = 0; i < TotalAmountOfVac; i++) {
          let Vaclist = document.getElementById("VacSelect");
          let VacNameFromJson = document.createElement("option");
          VacNameFromJson.setAttribute("value", "單字" + (i + 1));
          VacNameFromJson.textContent = json[i].id;
          Vaclist!.appendChild(VacNameFromJson);
        }
      });
      
      // let CurrentVacNumber: number = 0;
      // document.getElementById("NextVacButton")!.onclick = NestVac;
      // function NestVac() {
      //   let InputStoryNumber = GetInputWordNumber();
      //   GetDataFromJson.then(function (json) {
      //     let Storylength = json[InputStoryNumber].data.name.length;
      //     //判斷邊界
      //     if (CurrentPageNumber >= Storylength - 1)
      //       ShowCurrentPageEnglishSubtitle(CurrentPageNumber);
      //     else ShowCurrentPageEnglishSubtitle(CurrentPageNumber++);
      //   });
      // }

    // 顯示英文單字
    document.getElementById("ShowEnglishWordButton")!.onclick = ShowEnglishWordtitle;
    function ShowEnglishWordtitle() {
    let EngWordtitle = document.getElementById("EnglishWordtitle");
    let InputEngWordNumber = GetInputWordNumber();
    let Target = document.getElementById("EnglishWordtitle");
    if (EngWordtitle?.style.display == "none" || EngWordtitle?.innerHTML == null) {
    EngWordtitle!.setAttribute("style", "display:block");
    GetDataFromJson1.then(function (json) {
    let CurrentPageEngWord =
     json[InputEngWordNumber].data.name;
    Target!.innerHTML = StringJson(CurrentPageEngWord);
    console.log(CurrentPageEngWord);
    });

    // 顯示中文翻譯
    document.getElementById("ShowChinesehWordButton")!.onclick = ShowChineseWordtitle;
    function ShowChineseWordtitle() {
    let ChinWordtitle = document.getElementById("ChineseWordtitle");
    let InputChinWordNumber = InputEngWordNumber;
    let Target = document.getElementById("ChineseWordtitle");
    if (ChinWordtitle?.style.display == "none" || ChinWordtitle?.innerHTML == null) {
      if
      ChinWordtitle!.setAttribute("style", "display:block");
    GetDataFromJson1.then(function (json) {
    let CurrentPageChinWord =
     json[InputChinWordNumber].data.languages[0].tr_name;
    Target!.innerHTML = StringJson(CurrentPageChinWord);
    console.log(CurrentPageChinWord);
    });
    } else {
      ChinWordtitle?.setAttribute("style", "display:none");
    }
    }
    } else {
    EngWordtitle?.setAttribute("style", "display:none");
    }
    }

    
    
    // fetch("./resourse/vocabularies.json")
    // .then((resourse) => resourse.json())
    // .then((json) => console.log(json[grabWord].data.sentence));
    
    // fetch("./resourse/vocabularies.json")
    // .then((resourse) => resourse.json())
    // .then((json) => console.log(json[grabWord].data.languages[0].tr_name));
    
    // fetch("./resourse/vocabularies.json")
    // .then((resourse) => resourse.json())
    // .then((json) => console.log(json[grabWord].data.languages[0].tr_sentence));
=======
function GoTolearnWord() {
  open("http://127.0.0.1:5500/public/learnWords.html");
}

const GetDataFromJson1 = fetch(
  "http://127.0.0.1:5500/public/resourse/vocabularies.json"
).then((response) => response.json());

let grabWord: number;
//自動獲取瀏覽器內建語音包

speechSynthesis.addEventListener("voiceschanged", function () {
  let LanguageOption = window.speechSynthesis.getVoices();
  console.log(LanguageOption);
  for (let i = 0; i < LanguageOption.length; i++) {
    let LanguageSelect = document.getElementById("LanguageSelect");
    let OptionFromBrowser = document.createElement("option");
    OptionFromBrowser.setAttribute("value", "" + i);
    OptionFromBrowser.textContent = LanguageOption[i].name;
    LanguageSelect!.appendChild(OptionFromBrowser);
  }
});

GetDataFromJson1.then(function (json) {
  let TotalAmountOfVac = json.length;
  for (let i = 0; i < TotalAmountOfVac; i++) {
    let Vaclist = document.getElementById("VacSelect");
    let VacNameFromJson = document.createElement("option");
    VacNameFromJson.setAttribute("value", "單字" + (i + 1));
    VacNameFromJson.textContent = json[i].id;
    Vaclist!.appendChild(VacNameFromJson);
  }
});

let CurrentVacNumber: number = 0;
document.getElementById("NextVacButton")!.onclick = NestVac;
function NestVac() {
  let InputStoryNumber = GetInputStoryNumber();
  GetDataFromJson.then(function (json) {
    let Storylength = json[InputStoryNumber].data.pages.length;
    //判斷邊界
    if (CurrentPageNumber >= Storylength - 1)
      ShowCurrentPageEnglishSubtitle(CurrentPageNumber);
    else ShowCurrentPageEnglishSubtitle(CurrentPageNumber++);
  });
}
>>>>>>> 9b61613cc21c00c3576185e5f7fe3a5ac444b693
