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

    // 顯示單字(中、英)
    document.getElementById("ShowEng&ChinWordButton")!.onclick = ShowWordtitle;
    function ShowWordtitle() {
    let TheWordtitle = document.getElementById("Eng&ChinWordtitle");
    let InputEngWordNumber = GetInputWordNumber();
    let Target = document.getElementById("Eng&ChinWordtitle");
    if (TheWordtitle?.style.display == "none" || TheWordtitle?.innerHTML == null) {
      TheWordtitle!.setAttribute("style", "display:block");
    GetDataFromJson1.then(function (json) {
    let CurrentPageEngWord =
     json[InputEngWordNumber].data.name;
    Target!.innerHTML = StringJson(CurrentPageEngWord);
    console.log(CurrentPageEngWord);
    });
    } 
    else {
      TheWordtitle?.setAttribute("style", "display:none");
    }
    }

    // 顯示中文翻譯
    // document.getElementById("ShowChinesehWordButton")!.onclick = ShowChineseWordtitle;
    // function ShowChineseWordtitle() {
    // let ChinWordtitle = document.getElementById("ChineseWordtitle");
    // let InputChinWordNumber = InputEngWordNumber;
    // let Target = document.getElementById("ChineseWordtitle");
    // if (ChinWordtitle?.style.display == "none" || ChinWordtitle?.innerHTML == null) {
    //   // if
    //   ChinWordtitle!.setAttribute("style", "display:block");
    // GetDataFromJson1.then(function (json) {
    // let CurrentPageChinWord =
    //  json[InputChinWordNumber].data.languages[0].tr_name;
    // Target!.innerHTML = StringJson(CurrentPageChinWord);
    // console.log(CurrentPageChinWord);
    // });
    // } else {
    //   ChinWordtitle?.setAttribute("style", "display:none");
    // }}
    
    // fetch("./resourse/vocabularies.json")
    // .then((resourse) => resourse.json())
    // .then((json) => console.log(json[grabWord].data.sentence));
    
    // fetch("./resourse/vocabularies.json")
    // .then((resourse) => resourse.json())
    // .then((json) => console.log(json[grabWord].data.languages[0].tr_name));
    
    // fetch("./resourse/vocabularies.json")
    // .then((resourse) => resourse.json())
    // .then((json) => console.log(json[grabWord].data.languages[0].tr_sentence));