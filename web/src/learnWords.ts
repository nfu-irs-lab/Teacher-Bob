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
 //利用亂數抓單字庫的單字
function GetInputWordNumber(): number
{
  grabWord = Math.floor(Math.random()*51)//待改
  console.log(grabWord)
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
      
document.getElementById("ShowEngWordButton")!.onclick = ShowEnglishWordtitle;
function ShowEnglishWordtitle()
{
  let TheEngWordtitle = document.getElementById("EnglishWordtitle");
  let TheChinWordtitle = document.getElementById("ChineseWordtitle");
  let InputWordNumber = GetInputWordNumber();
  let TargetEng = document.getElementById("EnglishWordtitle");
  let TargetChin= document.getElementById("ChineseWordtitle");
  if (TheEngWordtitle?.style.display == "none" || TheEngWordtitle?.innerHTML == null) 
  {
    TheEngWordtitle!.setAttribute("style", "display:block");
    GetDataFromJson1.then(function (json) 
    {
      let CurrentPageEngWord =
      json[InputWordNumber].data.name;
      TargetEng!.innerHTML = StringJson(CurrentPageEngWord);
      console.log(CurrentPageEngWord);

      // 中文單字翻譯
      let CurrentPageChinWord =
      json[InputWordNumber].data.languages[0].tr_name;
      TargetChin!.innerHTML = StringJson(CurrentPageChinWord);

      // 顯示中文單字翻譯
      document.getElementById("ShowChinWordButton")!.onclick = ShowChineseWordtitle;
      function ShowChineseWordtitle()
      {
       if (TheEngWordtitle?.style.display == "block" || TheEngWordtitle?.innerHTML == null)   
       {
         if (TheChinWordtitle?.style.display == "none" || TheChinWordtitle?.innerHTML == null ) 
         {
           TheChinWordtitle!.setAttribute("style", "display:block");
           document.getElementById("ChineseWordtitle")?.setAttribute("style", "display:block");
         }
         else 
         {
          TheChinWordtitle?.setAttribute("style", "display:none");
         }
        }
        else
        {
          TheChinWordtitle?.setAttribute("style", "display:none"); 
        }
      }
    });
  } 
  else 
  {
    TheEngWordtitle?.setAttribute("style", "display:none");
    TheChinWordtitle?.setAttribute("style", "display:none"); 
  }
}