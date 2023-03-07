//開啟learnWord的網址
function goToLearnWord()
{
  open('http://127.0.0.1:5500/public/learnWords.html')
}
    
function StringJson(JsonWords: string): string 
{
  let StringfyJsonWord = JSON.stringify(JsonWords);
  let ParseJsonWord: string = JSON.parse(StringfyJsonWord);
  return ParseJsonWord;
}

const GetDataFromJson1 = fetch(
  "http://127.0.0.1:5500/public/resourse/vocabularies.json"
).then((response) => response.json());

let grabWord : number = 0
let NextGrabWord : number = 0
var CheckWord :number = 0
 //利用亂數抓單字庫的單字
function GetInputWordNumber(): number
{
  grabWord = Math.floor(Math.random()*51)//待改
  console.log(grabWord)
  
  document.getElementById("NextWordButton")!.onclick = NextWord;
  function NextWord()
  {
    NextGrabWord =  GetInputWordNumber();
    switch(true){
      case NextGrabWord==CheckWord: //如果亂數值等於紀錄值
      GetInputWordNumber(); //重新取亂數
      break;
      default: //如果亂數值不等於紀錄值
      CheckWord = NextGrabWord; //更新紀錄值
      break;
    }
    let TargetEngWord = document.getElementById("EnglishWordtitle");
    let TargetEngSentence = document.getElementById("EnglishSentencetitle");
    GetDataFromJson1.then(function (json) 
    {
      let CurrentPageEngWord =
      json[CheckWord].data.name;
      TargetEngWord!.innerHTML = StringJson(CurrentPageEngWord);
      let CurrentPageEngSentence =
      json[CheckWord].data.sentence;
      TargetEngSentence!.innerHTML = StringJson(CurrentPageEngSentence);
    })
  }
  return grabWord
}
    
//語言選單
speechSynthesis.addEventListener("voiceschanged", function () 
{
  let LanguageOption = window.speechSynthesis.getVoices();
  console.log(LanguageOption);
  for (let i = 0; i < LanguageOption.length; i++) 
  {
    let LanguageSelect = document.getElementById("LanguageSelect");
    let OptionFromBrowser = document.createElement("option");
    OptionFromBrowser.setAttribute("value", "" + i);
    OptionFromBrowser.textContent = LanguageOption[i].name;
    LanguageSelect!.appendChild(OptionFromBrowser);
  }
});

//單字選單      
GetDataFromJson1.then(function (json) 
{
  let TotalAmountOfVac = json.length;
  for (let i = 0; i < TotalAmountOfVac; i++) 
  {
    let Vaclist = document.getElementById("VacSelect");
    let VacNameFromJson = document.createElement("option");
    VacNameFromJson.setAttribute("value", "單字" + (i + 1));
    VacNameFromJson.textContent = json[i].id;
    Vaclist!.appendChild(VacNameFromJson);
  }
});

// 特定單字匯入
let WordNum: number;
function ChooseSpecificWordNumber(): number {
  const InputWord = document.getElementById(
    "VacSelect"
  ) as HTMLInputElement | null;
  WordNum = Number(InputWord?.value.slice(2));
  return WordNum-1;
}

 // 特定英文單字顯示
function ShowSpecificInputWord()
{
  let TheEngWordtitle = document.getElementById("EnglishWordtitle");
  let TheChinWordtitle = document.getElementById("ChineseWordtitle");
  let SpecificInputWordNumber = ChooseSpecificWordNumber();
  let TargetEngWord = document.getElementById("EnglishWordtitle");
  let TargetChinWord = document.getElementById("ChineseWordtitle");
  let TargetEngSentence = document.getElementById("EnglishSentencetitle");
  let TargetChinSentence = document.getElementById("ChineseSentencetitle");
  if (TheEngWordtitle?.style.display == "none" || TheEngWordtitle?.innerHTML == null) 
  {
    TheEngWordtitle!.setAttribute("style", "display:block");
    TargetEngSentence!.setAttribute("style", "display:block");
    GetDataFromJson1.then(function (json) 
    {
      // 英文單字顯示
      let CurrentPageEngWord =
      json[SpecificInputWordNumber].data.name;
      TargetEngWord!.innerHTML = StringJson(CurrentPageEngWord);
      console.log(CurrentPageEngWord);

      // 顯示英文例句
      let CurrentPageEngSentence =
      json[SpecificInputWordNumber].data.sentence;
      TargetEngSentence!.innerHTML = StringJson(CurrentPageEngSentence);
      console.log(CurrentPageEngSentence);

      // 中文單字翻譯
      let CurrentPageChinWord =
      json[SpecificInputWordNumber].data.languages[0].tr_name;
      TargetChinWord!.innerHTML = StringJson(CurrentPageChinWord);

      // 中文例句翻譯
      let CurrentPageChinSentence  =
      json[SpecificInputWordNumber].data.languages[0].tr_sentence;
      TargetChinSentence!.innerHTML = StringJson(CurrentPageChinSentence );

      // 顯示中文單字翻譯與例句翻譯
      document.getElementById("ShowChinWordButton")!.onclick = ShowEnglishWordtitle;
      function ShowEnglishWordtitle()
      {
       if (TheEngWordtitle?.style.display == "block" || TheEngWordtitle?.innerHTML == null)   
       {
         if (TheChinWordtitle?.style.display == "none" || TheChinWordtitle?.innerHTML == null ) 
         {
           TheChinWordtitle!.setAttribute("style", "display:block");
           document.getElementById("ChineseWordtitle")?.setAttribute("style", "display:block");
           TargetChinSentence!.setAttribute("style", "display:block");
           document.getElementById("ChineseSentencetitle")?.setAttribute("style", "display:block");
         }
         else 
         {
          TheChinWordtitle?.setAttribute("style", "display:none");
          TargetChinSentence?.setAttribute("style", "display:none");
         }
        }
        else
        {
          TheChinWordtitle?.setAttribute("style", "display:none"); 
          TargetChinSentence?.setAttribute("style", "display:none");
        }
      }
    });
  } 
  else 
  {
    TheEngWordtitle?.setAttribute("style", "display:none");
    TheChinWordtitle?.setAttribute("style", "display:none"); 
    TargetEngSentence?.setAttribute("style", "display:none");
    TargetChinSentence?.setAttribute("style", "display:none");
  }
}
      
document.getElementById("ShowEngWordButton")!.onclick = ShowEnglishWordtitle;
function ShowEnglishWordtitle()
{
  let TheEngWordtitle = document.getElementById("EnglishWordtitle");
  let TheChinWordtitle = document.getElementById("ChineseWordtitle");
  let InputWordNumber = GetInputWordNumber();
  let TargetEngWord = document.getElementById("EnglishWordtitle");
  let TargetChinWord = document.getElementById("ChineseWordtitle");
  let TargetEngSentence = document.getElementById("EnglishSentencetitle");
  let TargetChinSentence = document.getElementById("ChineseSentencetitle");
  if (TheEngWordtitle?.style.display == "none" || TheEngWordtitle?.innerHTML == null) 
  {
    TheEngWordtitle!.setAttribute("style", "display:block");
    TargetEngSentence!.setAttribute("style", "display:block");
    GetDataFromJson1.then(function (json) 
    {
      // 英文單字顯示
      let CurrentPageEngWord =
      json[InputWordNumber].data.name;
      TargetEngWord!.innerHTML = StringJson(CurrentPageEngWord);
      console.log(CurrentPageEngWord);

      // 顯示英文例句
      let CurrentPageEngSentence =
      json[InputWordNumber].data.sentence;
      TargetEngSentence!.innerHTML = StringJson(CurrentPageEngSentence);
      console.log(CurrentPageEngSentence);

      // 中文單字翻譯
      let CurrentPageChinWord =
      json[InputWordNumber].data.languages[0].tr_name;
      TargetChinWord!.innerHTML = StringJson(CurrentPageChinWord);

      // 中文例句翻譯
      let CurrentPageChinSentence  =
      json[InputWordNumber].data.languages[0].tr_sentence;
      TargetChinSentence!.innerHTML = StringJson(CurrentPageChinSentence );

      // 顯示中文單字翻譯與例句翻譯
      document.getElementById("ShowChinWordButton")!.onclick = ShowEnglishWordtitle;
      function ShowEnglishWordtitle()
      {
       if (TheEngWordtitle?.style.display == "block" || TheEngWordtitle?.innerHTML == null)   
       {
         if (TheChinWordtitle?.style.display == "none" || TheChinWordtitle?.innerHTML == null ) 
         {
           TheChinWordtitle!.setAttribute("style", "display:block");
           document.getElementById("ChineseWordtitle")?.setAttribute("style", "display:block");
           TargetChinSentence!.setAttribute("style", "display:block");
           document.getElementById("ChineseSentencetitle")?.setAttribute("style", "display:block");
         }
         else 
         {
          TheChinWordtitle?.setAttribute("style", "display:none");
          TargetChinSentence?.setAttribute("style", "display:none");
         }
        }
        else
        {
          TheChinWordtitle?.setAttribute("style", "display:none"); 
          TargetChinSentence?.setAttribute("style", "display:none");
        }
      }
    });
  } 
  else 
  {
    TheEngWordtitle?.setAttribute("style", "display:none");
    TheChinWordtitle?.setAttribute("style", "display:none"); 
    TargetEngSentence?.setAttribute("style", "display:none");
    TargetChinSentence?.setAttribute("style", "display:none");
  }
}



function GetSpeedRateToUser(): number {
  let SpeakRate = document.getElementById(
    "LanguageSpeed"
  ) as HTMLInputElement | null;
  let UserChoosenRate = Number(SpeakRate?.value);
  return UserChoosenRate;
}

function GetChoosenVoicesToUser(): number {
  let VoiceChoose = document.getElementById(
    "LanguageSelect"
  ) as HTMLInputElement | null;
  let LanguageNumber = Number(VoiceChoose?.value);
  return LanguageNumber;
}

document.getElementById("PlayButton")!.onclick = PlayVoice;
function PlayVoice() {
  let ReadWordTarget = document.getElementById("EnglishWordtitle")?.innerText;
  let ReadSentenceTarget = document.getElementById("EnglishSentencetitle")?.innerText;
  var msgWord = new SpeechSynthesisUtterance(ReadWordTarget);
  var msgSentence = new SpeechSynthesisUtterance(ReadSentenceTarget);
  msgWord.rate = GetSpeedRateToUser();
  msgSentence.rate = GetSpeedRateToUser();
  //從開啟的瀏覽器中獲取該瀏覽器支援的voice API
  var voices = window.speechSynthesis.getVoices();
  msgWord.voice = voices[GetChoosenVoicesToUser()];
  window.speechSynthesis.speak(msgWord);
  msgSentence.voice = voices[GetChoosenVoicesToUser()];
  window.speechSynthesis.speak(msgSentence);
}

document.getElementById("StopButton")!.onclick = StopPlayFunction;
function StopPlayFunction() {
  speechSynthesis.cancel();
}