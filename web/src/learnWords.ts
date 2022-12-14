function goToLearnWord(){
  open('http://127.0.0.1:5500/public/learnWords.html')
}
//開啟learnWord的網址

let grabWord : number
grabWord = Math.floor(Math.random()*51)//利用亂數抓單字庫的單字
//目前單字庫有52組單字，如有新增記得改()後面的數字與此註記

console.log(grabWord)

let test1 : JSON
let test2 : string
let test3! : string

var xhr = new XMLHttpRequest();
xhr.addEventListener("load", mainJs); //loading完成後就會執行mainJs
xhr.open('get','./resourse/vocabularies.json');
xhr.send(null);
function mainJs () {

let str = JSON.parse(xhr.responseText);

document.body.innerHTML = '<div id="myDiv"><div>'
let myContainer: HTMLDivElement | null = document.querySelector("#myDiv");

if (myContainer instanceof HTMLDivElement) {
    myContainer.innerHTML = test3;
    console.log(test3) 
}
}

// document.body.innerHTML = '<div id="myDiv"><div>'

// let myContainer: HTMLDivElement | null = document.querySelector("#myDiv");

// if (myContainer instanceof HTMLDivElement) {
//     myContainer.innerHTML = test3;
//     console.log(test3) 
// }

// .then(function(json)  {
//   return  test1 = (json[grabWord].data.name)})
// .then(function(test1)  {
//   return  test2  = JSON.stringify(test1)})
// .then(function(test2)  {
//   return  test3 = JSON.parse(test2)})
// .then(function showText(res)  {
//   return  test3 })


// fetch("./resourse/vocabularies.json") //將vocabularies.json檔導入learnWord.ts
// .then(response => 
//   response.json()
// )
// .then(json => 
//    (json[grabWord].data.name)
// )
// .then(test1 => 
//   test2  = JSON.stringify(test1)
// )
// .then(test2 => 
//    test3 = JSON.parse(test2)
// )
// .then(test3 => 
//   console.log(test3) 
// )



  


function showNumber(myNumber :string): string
{
 return myNumber = "124"
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
  