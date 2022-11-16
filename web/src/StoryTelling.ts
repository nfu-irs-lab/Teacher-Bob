function GoStorySelectPage() {
  open("http://127.0.0.1:5500/public/StorySelectPage.html");
}
// 獲取使用者選擇的故事
function GetInputStory() {
  const InputStory = document.getElementById(
    "Storylist"
  ) as HTMLInputElement | null;
  if (typeof InputStory != null) {
    InitializePage(InputStory as HTMLInputElement);
  } else alert("找不到故事");
}

function InitializePage(TitleName: HTMLInputElement) {
  // 顯示故事中英文標題
  const title = document.getElementById("title");
  if (title != null) title.innerHTML = TitleName.value + "<br>";
  console.log(TitleName.value);
  let obj: namespace.Page = JSON.parse('{"text":"string"}');

  console.log(obj.text);
}

// const mode = require("./StoryLib/text.json");
// for (let i = 0; i < mode.length; i++) {
//   console.log(mode[i]);
// }
fetch("./resourse/story.json")
  .then((response) => response.json())
  .then((json) => console.log(json[0].id));

declare module namespace {
  export interface Page {
    text: string;
    audio: string;
    image: string;
    action: string;
  }

  export interface Data {
    name: string;
    total: number;
    pages: Page[];
  }

  export interface RootObject {
    id: string;
    name: string;
    chinesesubtitle: string;
    data: Data;
  }
}

// document
//   .getElementById(InputStory?.value as string)
//   ?.addEventListener("click", () => {
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
