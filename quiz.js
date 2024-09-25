// camera on
const video = document.querySelector('video');

const startWebCam = () =>{
 if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream).catch(error => console.log(error));
 }
}
startWebCam();

const StopWebCam = ()=>{
  let stream = video.srcObject;
  let tracks = stream.getTracks();
  tracks.forEach(track => track.stop());
  video.srcObject = null;
}

// disable copy
function killCopy(e){
    return false
    }
    function reEnable(){
    return true
    }
    document.onselectstart=new Function ("return false")
    if (window.sidebar){
    document.onmousedown=killCopy
    document.onclick=reEnable
    }

//quiz app 
function startCountdown() {
    var countdown = 60;
    var countdownElement = document.getElementById('countdown');
    var countdownInterval = setInterval(function() {
    countdownElement.innerText = countdown;
    countdown--;
    if (countdown < 0) {
    clearInterval(countdownInterval);
    }
    }, 1000);
    }
    startCountdown();

let questions = [
{
  numb: 1,
  question: "Which type of JavaScript language is ___.",
  answer: "Object-Based",
  options: [
      "Object-Oriented",
      "Object-Based",
      "Assembly-language",
      "High-level"
  ]
},

{
  numb: 2,
  question: "What does CSS stand for?",
  answer: "Cascading Style Sheet",
  options: [
    "Common Style Sheet",
    "Colorful Style Sheet",
    "Computer Style Sheet",
    "Cascading Style Sheet"
  ]
},

{
  numb: 3,
  question: "Which one of the following also known as Conditional Expression",
  answer: "immediate if",
  options: [
      "Alternative to if-else",
      "Switch statement",
      "If-then-else statement",
      "immediate if"
  ]
},

{
  numb: 4,
  question: "What does SQL stand for?",
  answer: "Structured Query Language",
  options: [
    "Stylish Question Language",
    "Stylesheet Query Language",
    "Statement Question Language",
    "Structured Query Language"
  ]
},

{
  numb: 5,
  question: "What does XML stand for?",
  answer: "eXtensible Markup Language",
  options: [
    "eXtensible Markup Language",
    "eXecutable Multiple Language",
    "eXTra Multi-Program Language",
    "eXamine Multiple Language"
  ]
},
];

const start_btn = document.querySelector(".start_btn button");
const rules_Box = document.querySelector(".rules_Box");
const exit_btn = rules_Box.querySelector(".buttons .quit");
const continue_btn = rules_Box.querySelector(".buttons .continue");
const quiz_Box = document.querySelector(".quiz_Box");
const options_list = document.querySelector(".options_list");

//start btn click
start_btn.onclick = () =>
{
// rules_Box.classList.add("activeRule");
// rules_Box.classList.remove("activeRule");
quiz_Box.classList.add("activeQuiz");
showQuestion(0);
queCounter(1);
}

//quit btn click
exit_btn.onclick = () =>
{
rules_Box.classList.remove("activeRule");
}

//continue btn click
continue_btn.onclick = () =>
{
// rules_Box.classList.remove("activeRule");
// quiz_Box.classList.add("activeQuiz");
// showQuestion(0);
// queCounter(1);
}

let que_count = 0;
let que_numb = 1;
let userScore = 0;

const next_btn = quiz_Box.querySelector(".next_btn");
const result_Box = document.querySelector(".result_Box");
const restart_quiz = result_Box.querySelector(".buttons .continue");
const quit_quiz = result_Box.querySelector(".buttons .quit");

//next btn click
next_btn.onclick = ()=>
{
if(que_count < questions.length - 1)
{
    que_count++;
    que_numb++;
    showQuestion(que_count);
    queCounter(que_numb);
}
else
{
    showResultBox();
}
}

function showQuestion(index)
{
const que_text = document.querySelector(".questions_List");
let que_tag = '<span>'+ questions[index].numb +". " + questions[index].question +'</span>';
let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
                + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
                + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
                + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
que_text.innerHTML = que_tag;
options_list.innerHTML = option_tag;

const option1 = options_list.querySelectorAll(".option");
for(let i=0; i<option1.length;i++)
{
    option1[i].setAttribute("onclick", "optionSelected(this)");
} 
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer)
{
let userAns = answer.textContent;
let correctAns = questions[que_count].answer;
let allOptions = options_list.children.length;
if(userAns == correctAns)
{
    userScore+=1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend",tickIcon);
}
else
{
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend",crossIcon);
    for(let i=0;i<allOptions;i++)
    {
        if(options_list.children[i].textContent == correctAns)
        {
            options_list.children[i].setAttribute("class","option correct");
            options_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
        }
    }
}

for(let i= 0; i< allOptions ; i++)
{
    options_list.children[i].classList.add("disabled");
}
}

function showResultBox()
{
rules_Box.classList.remove("activeRule");
quiz_Box.classList.remove("activeQuiz");
result_Box.classList.add("activeResult");
const scoreText = result_Box.querySelector(".score_text");
if(userScore > 3)
{
    let scoreTag = '<span>Congratulations!! You got <p>' + userScore + '</p> Out of <p>' + questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
}
else if(userScore > 1)
{
    let scoreTag = '<span>Nice!! You got <p>' + userScore + '</p> Out of <p>' + questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
}
else
{
    let scoreTag = '<span>Sorry!! You got only <p>' + userScore + '</p> Out of <p>' + questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
}
}

function queCounter(index)
{
const bottom_que_counter = quiz_Box.querySelector(".total_que");
let totalQuestionTag = '<span><p>'+ index + '</p> of <p>' + questions.length +'</p>Questions</span>';
bottom_que_counter.innerHTML = totalQuestionTag;
}

// restart_quiz.onclick = () =>
// {
// window.location.reload();
// }

quit_quiz.onclick = () =>
{
window.location.reload();
}


// context menu deisable
document.addEventListener("contextmenu" ,(e) => {

    e.preventDefault();
    alert("click not accessible");
})