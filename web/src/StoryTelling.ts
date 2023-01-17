//透過fetch在後台服務器獲取數據，透過第一個then將原始數據轉換成.json格式
const GetDataFromJson = fetch(
  "http://127.0.0.1:5500/public/resourse/story.json"
).then((response) => response.json());

document
  .getElementById("function5")
  ?.addEventListener("click", GoStorySelectPage);
document
  .getElementById("function5")
  ?.addEventListener("click", LoadAllStoryFromJson);
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
    Storylist!.appendChild(StoryNameFromJson);
  }
});

let StoryNum: number;
let PageCount: number = 0;

function GetInputStory(): number {
  const InputStory = document.getElementById(
    "Storylist"
  ) as HTMLInputElement | null;
  StoryNum = Number(InputStory?.value.slice(5));
  return StoryNum - 1;
}

function InitializePage() {
  //將第一層頁面隱藏，顯示第二層頁面
  document.getElementById("SelectPage")?.setAttribute("style", "display:none");
  document.getElementById("WorkPage")?.setAttribute("style", "display:block");

  //初始化語言選擇選單
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
}

let EngSubState: boolean = false;
function ChangeState() {
  if (EngSubState == false) {
    document
      .getElementById("EnglishSubtitle")
      ?.setAttribute("style", "display:block");
    EngSubState = true;
  } else {
    document
      .getElementById("EnglishSubtitle")
      ?.setAttribute("style", "display:none");
    EngSubState = false;
  }
}
function StringfyJson(JsonWords: string): string {
  let StringfyJsonWord = JSON.stringify(JsonWords);
  let ParseJsonWord: string = JSON.parse(StringfyJsonWord);
  return ParseJsonWord;
}

let CurrentPageNumber: number = 0;
function ShowEnglishSubtitle() {
  let EnglishSubtitleShow = document.getElementById("EnglishSubtitle");
  if (EnglishSubtitleShow?.style.display == "none") {
    EnglishSubtitleShow.setAttribute("style", "display:block");
    let Showbutton = document.getElementById("ShowEnglishButton");
    Showbutton?.addEventListener("click", function () {
      let number = GetInputStory();
      GetDataFromJson.then(function (json) {
        StringfyJson(json[number].data.pages[CurrentPageNumber].text);
        let Target = document.getElementById("EnglishSubtitle");
        Target!.innerHTML = StringfyJson(
          json[number].data.pages[CurrentPageNumber].text
        );
      });
    });
  } else {
    EnglishSubtitleShow?.setAttribute("style", "display:none");
  }
}

document.getElementById("NextPageButton")!.onclick = NestLine;
function NestLine() {
  let InputStoryNumber = GetInputStory();
  GetDataFromJson.then(function (json) {
    let Target = document.getElementById("EnglishSubtitle");
    let Storylength = json[InputStoryNumber].data.pages.length;
    if (CurrentPageNumber >= Storylength - 1) {
      CurrentPageNumber = Storylength - 1;
      Target!.innerHTML = StringfyJson(
        json[InputStoryNumber].data.pages[CurrentPageNumber].text
      );
      console.log(CurrentPageNumber);
    } else {
      CurrentPageNumber++;
      Target!.innerHTML = StringfyJson(
        json[InputStoryNumber].data.pages[CurrentPageNumber].text
      );
    }
  });
}

document.getElementById("LastPageButton")!.onclick = LastLine;
function LastLine() {
  let InputStoryNumber = GetInputStory();
  GetDataFromJson.then(function (json) {
    let Target = document.getElementById("EnglishSubtitle");
    if (CurrentPageNumber <= 0) {
      CurrentPageNumber = 0;
      Target!.innerHTML = StringfyJson(
        json[InputStoryNumber].data.pages[CurrentPageNumber].text
      );
      console.log(CurrentPageNumber);
    } else {
      CurrentPageNumber--;
      Target!.innerHTML = StringfyJson(
        json[InputStoryNumber].data.pages[CurrentPageNumber].text
      );
    }
  });
}

document.getElementById("PlayButton")!.onclick = Play;
function Play() {
  let ReadTarget = document.getElementById("EnglishSubtitle")?.innerText;
  var msg = new SpeechSynthesisUtterance(ReadTarget);
  msg.rate = 1;
  let VoiceChoose = document.getElementById(
    "LanguageSelect"
  ) as HTMLInputElement | null;
  let LanguageNumber = Number(VoiceChoose?.value);
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[LanguageNumber];
  window.speechSynthesis.speak(msg);
}
