"use strict";
console.log("hello");
let function5 = document.getElementById("function5");
function5 === null || function5 === void 0 ? void 0 : function5.addEventListener("click", function () {
    open("./StoryTelling.html");
});
let PickkedStory = document.getElementById("story1");
PickkedStory === null || PickkedStory === void 0 ? void 0 : PickkedStory.addEventListener("click", function () {
    open("./StoryLib/story1.txt");
});
const synth = window.speechSynthesis;
const utter = new SpeechSynthesisUtterance();
utter.text = "the three little pig";
const speak = () => synth.speak(utter);
//# sourceMappingURL=StoryTelling.js.map