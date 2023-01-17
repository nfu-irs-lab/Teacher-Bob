function GoStorySelectPage() {
  open("http://127.0.0.1:5500/public/StorySelectPage.html");
}
let StoryNum: number;
let PageCount: number = 0;

//透過fetch在後台服務器獲取數據，透過第一個then將原始數據轉換成.json格式
const GetDataFromJson = fetch(
  "http://127.0.0.1:5500/public/resourse/story.json"
).then((response) => response.json());

function GetInputStory(): number {
  const InputStory = document.getElementById(
    "Storylist"
  ) as HTMLInputElement | null;
  StoryNum = Number(InputStory?.value.slice(5));
  console.log("story" + StoryNum);
  return StoryNum - 1;
}
function InitializePage() {
  document.getElementById("SelectPage")?.setAttribute("style", "display:none");
  document.getElementById("WorkPage")?.setAttribute("style", "display:block");
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

function ShowEnglishSubtitle() {
  document
    .getElementById("ShowEnglishButton")
    ?.addEventListener("click", function () {
      let number = GetInputStory();
      GetDataFromJson.then(function (json) {
        let StringfyJsonWord = JSON.stringify(json[number].englishsubtitle);
        let ParseJsonWord: string = JSON.parse(StringfyJsonWord);
        let Target = document.getElementById("EnglishSubtitleLabel");
        Target!.innerHTML = ParseJsonWord;
      });
    });
}

function NestLine() {
  document
    .getElementById("NextPageButton")
    ?.addEventListener("click", function () {
      let number = GetInputStory();
      GetDataFromJson.then(function (json) {
        let StringfyJsonWord = JSON.stringify(
          json[number].data.pages[PageNumber].text
        );
        let ParseJsonWord: string = JSON.parse(StringfyJsonWord);
        let Target = document.getElementById("EnglishSubtitle");
        Target!.innerHTML = ParseJsonWord;
        PageNumber++;
        console.log(1);
      });
    });
}

function LastLine() {
  document
    .getElementById("LastPageButton")
    ?.addEventListener("click", function () {
      let number = GetInputStory();
      GetDataFromJson.then(function (json) {
        let StringfyJsonWord = JSON.stringify(
          json[number].data.pages[PageNumber].text
        );
        let ParseJsonWord: string = JSON.parse(StringfyJsonWord);
        let Target = document.getElementById("EnglishSubtitle");
        Target!.innerHTML = ParseJsonWord;
        PageNumber--;
        console.log(2);
      });
    });
}
// (json) => (nnn = JSON.parse(JSON.stringify(json[0].chinesesubtitle)));
// console.log(nnn);
//json[0].chinesesubtitle

// if (btn1 != null) btn1.onclick = ChangeState;
// let CheckStoryNum = () => {
//   GetDataFromJson.then(function (json) {
//     for (let i = 0; i < json.length; i++) {
//       if (json[i].id == `story${i + 1}`) {
//         return i;
//       }
//     }
//   });
// };
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

document.getElementById("text")?.addEventListener("click", () => {});
const synth = window.speechSynthesis;
const utter = new SpeechSynthesisUtterance();
utter.text = document.getElementById("function5")?.innerText as string;
const speak = () => synth.speak(utter);
