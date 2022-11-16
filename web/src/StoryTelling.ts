console.log("hello");
let function5 = document.getElementById("function5");
function5?.addEventListener("click", function () {
  open('http://127.0.0.1:5500/public/StoryTelling.html');
});
let PickkedStory = document.getElementById("story1");
PickkedStory?.addEventListener("click", function () {
  open("./StoryLib/story1.txt");
});

const synth = window.speechSynthesis;
const utter = new SpeechSynthesisUtterance();
utter.text = "the three little pig";
const speak = () => synth.speak(utter);
