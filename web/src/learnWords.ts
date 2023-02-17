//開啟learnWord的網址
function goToLearnWord(){
  open('http://127.0.0.1:5500/public/learnWords.html')
}

function StringConvertJson(JsonWords: string): string {
  let StringfyJsonWord = JSON.stringify(JsonWords);
  let ParseJsonWord: string = JSON.parse(StringfyJsonWord);
  return ParseJsonWord;
}

let grabWord : number = 0
function GetInputWordNumber(): number{
  //利用亂數抓單字庫的單字
 grabWord = Math.floor(Math.random()*51)//待改
console.log(grabWord)
return grabWord
}

function ShowCurrentPageEnglishWord() {
  GetDataFromJson.then(function (json) {
    let InputEngWordNumber = GetInputWordNumber();
    let Target = document.getElementById("EnglishWordtitle");
    let CurrentPageEngWord =
     json[InputEngWordNumber].data.languages[0].tr_name.text;
    Target!.innerHTML = StringfyJson(CurrentPageEngWord);
  });
}


const GetDataFromJson1 = fetch(
  "http://127.0.0.1:5500/public/resourse/vocabularies.json"
).then((response) => response.json());



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

//單字選單
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
  let InputWordNumber = GetInputWordNumber();
  GetDataFromJson.then(function (json) {
    let Storylength = json[InputWordNumber].data.pages.length;
    //判斷邊界
    if (CurrentPageNumber >= Storylength - 1)
    ShowCurrentPageEnglishWordtitle(CurrentPageNumber);
    else ShowCurrentPageEnglishWordtitle(CurrentPageNumber++);
  });
}

function ShowCurrentPageEnglishWordtitle(CurrentPageNumber: number) {
  throw new Error("Function not implemented.");
}

document.getElementById("ShowEnglishWordButton")!.onclick = ShowEnglishWordtitle;
function ShowEnglishWordtitle() {
  let EngWordtitle = document.getElementById("EnglishWordtitle");
  let InputEngWordNumber = GetInputWordNumber();
  let Target = document.getElementById("EnglishWordtitle");
  if (EngWordtitle?.style.display == "none" || EngWordtitle?.innerHTML == null) {
    EngWordtitle!.setAttribute("style", "display:block");
    GetDataFromJson.then(function (json) {
      let CurrentPageEngWord =
        json[InputEngWordNumber].data.languages[0].tr_name.text;
      Target!.innerHTML = StringfyJson(CurrentPageEngWord);
      console.log(CurrentPageEngWord);
    });
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
  