//Home Page
var words = ["Data Scientist", "ML Engineer", "A & A Engineer"],
part,
i = 0,
offset = 0,
len = words.length,
forwards = true,
skip_count = 0,
skip_delay = 15,
speed = 70;
var wordflick = function () {
setInterval(function () {
  if (forwards) {
    if (offset >= words[i].length) {
      ++skip_count;
      if (skip_count == skip_delay) {
        forwards = false;
        skip_count = 0;
      }
    }
  }
  else {
    if (offset == 0) {
      forwards = true;
      i++;
      offset = 0;
      if (i >= len) {
        i = 0;
      }
    }
  }
  part = words[i].substr(0, offset);
  if (skip_count == 0) {
    if (forwards) {
      offset++;
    }
    else {
      offset--;
    }
  }
  $('.word').text(part);
},speed);
};
$(document).ready(function () {
wordflick();
});
//compose page including error in compose.
function player(){
    const compose = new Audio("audio/compose.mp3");
    compose.play();
  }
    const textcontain = document.querySelector(".tap-box");
    const countNum = document.querySelector(".counter");
    const countMan = document.querySelector(".content")
    textcontain.addEventListener("input", count);
  function count(){
    const number = textcontain.value.length;
    countNum.innerHTML = number;
    if( number <= 1000){
        countMan.classList.remove("admob");
    }
    else{
        countMan.classList.add("admob");
    }
  }
  function updateLabel() {
  const input = document.getElementById('file');
  const label = document.querySelector('.file-text');

  if (input.files && input.files.length > 0) {
    label.textContent = 'Image Selected';
  } else {
    label.textContent = 'Select an Image';
  }
}
//contact page
function player(){
    const compose = new Audio("audio/compose.mp3");
    compose.play();
  }


