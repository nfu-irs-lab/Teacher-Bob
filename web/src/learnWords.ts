function goToLearnWord(){
  open('http://127.0.0.1:5500/public/learnWords.html')//開啟learnWord的網址
}

let grabWord : number
let StoryNum1: number;

const GetDataFromJson1 = fetch(
  "http://127.0.0.1:5500/public/resourse/vocabularies.json"
).then((response) => response.json());

function GetInputStory1(): number {
  const InputStory = document.getElementById(
    "Storylist"
  ) as HTMLInputElement | null;
  StoryNum1 = Number(InputStory?.value.slice(5));
  return StoryNum1 - 1;
}

let EngSubState1: boolean = false;
function ChangeState1() {
  if (EngSubState1 == false) {
    document
      .getElementById("EnglishSubtitle")
      ?.setAttribute("style", "display:block");
    EngSubState1 = true;
  } else {
    document
      .getElementById("EnglishSubtitle")
      ?.setAttribute("style", "display:none");
    EngSubState1 = false;
  }
}
grabWord = Math.floor(Math.random()*51)//利用亂數抓單字庫的單字
//目前單字庫有52組單字，如有新增記得改()後面的數字與此註記
console.log(grabWord)

function StringfyJson1(JsonWords: string): string {
  let StringfyJsonWord = JSON.stringify(JsonWords);
  let ParseJsonWord: string = JSON.parse(StringfyJsonWord);
  return ParseJsonWord;
}

let CurrentPageNumber1: number = 0;
function ShowLearnWord() {
  let EnglishSubtitleShow = document.getElementById("EnglishSubtitle");
  if (EnglishSubtitleShow?.style.display == "none") {
    EnglishSubtitleShow.setAttribute("style", "display:block");
    let Showbutton = document.getElementById("ShowButton");
    Showbutton?.addEventListener("click", function () {
      let grabWord = GetInputStory1();
      GetDataFromJson1.then(function (json) {
        StringfyJson1(json[grabWord].data.languages[CurrentPageNumber1].tr_name.text);
        let Target = document.getElementById("EnglishSubtitle");
        Target!.innerHTML = StringfyJson1(
          json[grabWord].data.languages[CurrentPageNumber1].tr_name.text
        );
      });
    });
  } else {
    EnglishSubtitleShow?.setAttribute("style", "display:none");
  }
}

console.log(StringfyJson1)


  // fetch("./resourse/vocabularies.json") 
  // .then((resourse) => resourse.json())
  // .then((json) => console.log(json[grabWord].data.sentence));

  // fetch("./resourse/vocabularies.json") 
  // .then((resourse) => resourse.json())
  // .then((json) => console.log(json[grabWord].data.languages[0].tr_name));

  // fetch("./resourse/vocabularies.json") 
  // .then((resourse) => resourse.json())
  // .then((json) => console.log(json[grabWord].data.languages[0].tr_sentence));
  