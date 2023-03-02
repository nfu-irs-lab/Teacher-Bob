function GoTolearnWord(){
  open('http://127.0.0.1:5500/public/learnWords.html')
}

let grabWord : number
grabWord = Math.floor(Math.random()*73)//利用亂數抓單字庫的單字