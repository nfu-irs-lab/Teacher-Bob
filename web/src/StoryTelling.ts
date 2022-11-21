function GoStorySelectPage() {
  open("http://127.0.0.1:5500/public/StorySelectPage.html");
}
let StoryNum: number;
let PageCount: number = 0;
let EngSubState: boolean = false;
//透過fetch在後台服務器獲取數據，透過第一個then將原始數據轉換成.json格式
const GetDataFromJson = fetch(
  "http://127.0.0.1:5500/public/resourse/story.json"
).then((response) => response.json());

function PromiseToString(promise: Promise<any>): String {
  let tem = JSON.stringify(promise);
  let result = JSON.parse(tem);
  return result;
}

function GetInputStoryNum(): number {
  const InputStory = document.getElementById(
    "Storylist"
  ) as HTMLInputElement | null;
  StoryNum = Number(InputStory?.value.slice(5));
  console.log("story" + StoryNum);
  return StoryNum;
}
function InitializePage() {
  document.getElementById("FirstPage")?.setAttribute("style", "display:none");
  document.getElementById("SecondPage")?.setAttribute("style", "display:block");
}
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
let btn1 = document.getElementById("EnglishSubtitle");
if (btn1 != null) btn1.onclick = ChangeState;
let CheckStoryNum = () => {
  GetDataFromJson.then(function (json) {
    for (let i = 0; i < json.length; i++) {
      if (json[i].id == `story${i + 1}`) {
        return i;
      }
    }
  });
};
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
