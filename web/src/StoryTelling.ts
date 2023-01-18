function StringfyJson(JsonWords: string): string {
  let StringfyJsonWord = JSON.stringify(JsonWords);
  let ParseJsonWord: string = JSON.parse(StringfyJsonWord);
  return ParseJsonWord;
}

function ShowCurrentPageEnglishSubtitle(CurrentPageNumber: number) {
  GetDataFromJson.then(function (json) {
    let InputStoryNumber = GetInputStoryNumber();
    let Target = document.getElementById("EnglishSubtitle");
    let CurrentPageEngSubtitle =
      json[InputStoryNumber].data.pages[CurrentPageNumber].text;
    Target!.innerHTML = StringfyJson(CurrentPageEngSubtitle);
  });
}

//透過fetch在後台服務器獲取數據，透過第一個then將原始數據轉換成.json格式
const GetDataFromJson = fetch(
  "http://127.0.0.1:5500/public/resourse/story.json"
).then((response) => response.json());

document
  .getElementById("function5")
  ?.addEventListener("click", GoStorySelectPage);
function GoStorySelectPage() {
  open("http://127.0.0.1:5500/public/StorySelectPage.html");
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

function GetInputStoryNumber(): number {
  const InputStory = document.getElementById(
    "Storylist"
  ) as HTMLInputElement | null;
  StoryNum = Number(InputStory?.value.slice(5));
  return StoryNum - 1;
}

function InitializeWorkPage() {
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
document.getElementById("ShowEnglishButton")!.onclick = ShowEnglishSubtitle;
function ShowEnglishSubtitle() {
  let EngSubtitle = document.getElementById("EnglishSubtitle");
  let InputStoryNumber = GetInputStoryNumber();
  let Target = document.getElementById("EnglishSubtitle");
  if (EngSubtitle?.style.display == "none" || EngSubtitle?.innerHTML == null) {
    EngSubtitle!.setAttribute("style", "display:block");
    GetDataFromJson.then(function (json) {
      let CurrentPageEngSubtitle =
        json[InputStoryNumber].data.pages[CurrentPageNumber].text;
      Target!.innerHTML = StringfyJson(CurrentPageEngSubtitle);
      console.log(CurrentPageNumber);
    });
  } else {
    EngSubtitle?.setAttribute("style", "display:none");
  }
}

let CurrentPageNumber: number = 0;
document.getElementById("NextPageButton")!.onclick = NestLine;
function NestLine() {
  let InputStoryNumber = GetInputStoryNumber();
  GetDataFromJson.then(function (json) {
    let Storylength = json[InputStoryNumber].data.pages.length;
    //判斷邊界
    if (CurrentPageNumber >= Storylength - 1)
      ShowCurrentPageEnglishSubtitle(CurrentPageNumber);
    else ShowCurrentPageEnglishSubtitle(CurrentPageNumber++);
  });
}

document.getElementById("LastPageButton")!.onclick = LastLine;
function LastLine() {
  //判斷邊界
  GetDataFromJson.then(function () {
    if (CurrentPageNumber <= 0)
      ShowCurrentPageEnglishSubtitle(CurrentPageNumber);
    else ShowCurrentPageEnglishSubtitle(CurrentPageNumber--);
  });
}

function GetSpeedRateFromUser(): number {
  let SpeakRate = document.getElementById(
    "LanguageSpeed"
  ) as HTMLInputElement | null;
  let UserChoosenRate = Number(SpeakRate?.value);
  return UserChoosenRate;
}

function GetChoosenVoicesFromUser(): number {
  let VoiceChoose = document.getElementById(
    "LanguageSelect"
  ) as HTMLInputElement | null;
  let LanguageNumber = Number(VoiceChoose?.value);
  return LanguageNumber;
}

document.getElementById("PlayButton")!.onclick = Play;
function Play() {
  let ReadTarget = document.getElementById("EnglishSubtitle")?.innerText;
  var msg = new SpeechSynthesisUtterance(ReadTarget);
  msg.rate = GetSpeedRateFromUser();
  //從開啟的瀏覽器中獲取該瀏覽器支援的voice API
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[GetChoosenVoicesFromUser()];
  window.speechSynthesis.speak(msg);
}

document.getElementById("AutoPlayButton")!.onclick = AutoPlay;
function AutoPlay() {
  let InputStoryNumber = GetInputStoryNumber();
  GetDataFromJson.then(function (json) {
    let Storylength = json[InputStoryNumber].data.pages.length;
    for (let i = 0; i < Storylength; i++) {
      let ReadTarget = StringfyJson(json[InputStoryNumber].data.pages[i].text);

      let msg = new SpeechSynthesisUtterance(ReadTarget);
      msg.rate = GetSpeedRateFromUser();
      var voices = window.speechSynthesis.getVoices();
      msg.voice = voices[GetChoosenVoicesFromUser()];
      window.speechSynthesis.speak(msg);
    }
  });
}

document.getElementById("StopButton")!.onclick = StopPlay;
function StopPlay() {
  speechSynthesis.cancel();
}

document.getElementById("PauseButton")!.onclick = Pause;
let SpeakingState: boolean = true;
function Pause() {
  if (SpeakingState == true) {
    speechSynthesis.pause();
    SpeakingState = false;
  } else {
    speechSynthesis.resume();
    SpeakingState = true;
  }
}
