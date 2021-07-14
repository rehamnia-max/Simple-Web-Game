
var arr = [
    ["ما معنى لا إله إلا الله ؟", "لا معبود إلا الله", "الله يستحق العبادة", "الله وحده لا شريك له", "لا معبود بحق إلا الله ", 4],
    ["ماهو التوحيد ؟", "الإخلاص في عبادة الله", "إفراد الله بالعبادة", "دعوة غير الله معه", "هو قول لا إله إلا الله باللسان", 2],
    ["ماهو الشرك ؟", "سب الملك العلام", "معصية بعض أوامر النبي صلى الله عليه و سلم", "دعوة غير الله معه", "عبادة الله وحده", 3],
    ["ما الأصول الثلاثة التي يجب على الإنسان معرفتها ؟", "الله، القرآن ، و السنة", "الرسول صلى الله عليه و سلم ، القرآن ، و الله", "توحيد أسماء الله ،صفاته، و كذا ربوبيته", "معرفة العبد ربه ، دينه ، و نبيه محمد صلى الله عليه و سلم", 4],
    ["ماذا يقول من خاف على نفسه الشرك ؟", "اللهم إني أعوذ بك من الشرك", "يا رب لا تجعلني من المشركين", "اللهم إني أعوذ بك من أن أشرك بك بما أعلم و أستغفرك لما لا أعلم", "أعوذ بالله من الكفر و الشرك و تبدل الدين", 3],
    ["ماهي أشرف مهمة خلق لها الإنسان ؟", "عمارة الأرض", "الصلاة", "طاعة الوالدين و الإحسان إلى الغير", "توحيد الله تعالى", 4],
    ["توحيد الله ينقسم إلى  ؟", "توحيد الألوهية", "يا رب لا تجعلني من المشركين", "توحيد الألوهية ، الربوبية ، و كذا الأسماء و الصفات", "توحيد الألوهية و الربوبية", 3]
]
    ;
const nbrOfQuestions = 6;
const gameTime = 50;
var questionNode = document.getElementsByClassName("question");
var optionNode = document.getElementsByClassName("option");
var btnNode = document.getElementById("btn");
let t = document.getElementById("timerSpan");
let w = document.getElementById("warning");
var score = 0;
var wrong = 0;
var rnd = 0;
var rnd2 = 0;
bool = false;
let table1 = new Array();
let table2 = new Array();
//initialised by true to allow to execute the setDataFun for the first time;
var select = true;
var myInterval;
//Setting what will display
document.getElementsByClassName("messageBlock")[0].style.display = "block";
document.getElementsByClassName("messageBlock")[1].style.display = "none";
document.getElementsByClassName("main-window")[0].style.display = "none";

//Events :
document.getElementById("startBtn").onclick = function () {
    //When the game is starting:
    document.getElementsByClassName("main-window")[0].style.display = "block";
    document.getElementsByClassName("messageBlock")[0].style.display = "none";
    t.innerText = gameTime;
    setDataFunc();
    shadowAnimation(document.getElementById("follow"), 250, 10000);
    startTimer();

};
document.getElementById("tryAgainBtn").onclick = function () { document.location.reload(true); };
btnNode.onclick = setDataFunc;
for (let i = 0; i < optionNode.length; i++) {
    optionNode[i].onmousemove = mOverOption;
    optionNode[i].onmouseout = mOutOption;
}

optionNode[0].onclick = answersProcessingFunc;
optionNode[1].onclick = answersProcessingFunc;
optionNode[2].onclick = answersProcessingFunc;
optionNode[3].onclick = answersProcessingFunc;
//Button Events
var btnNode = document.getElementsByClassName("buton");
for (let i = 0; i < optionNode.length; i++) {
    btnNode[i].onmousemove = mOverBtn;
    btnNode[i].onmouseout = mOutBtn;
}

///Functions
function mOverOption() {
    this.style.padding = "2.3%";
    this.style.marginBottom = "-0.45%";
    this.style.marginTop = "-0.45%";
    this.style.fontSize = "105%";
    this.style.borderStyle = "outset";
}


function mOutOption() {
    this.style.padding = "2%";
    this.style.margin = "1%";
    this.style.borderStyle = "inset";
    this.style.fontSize = "100%";
}



function setDataFunc() {
    if ((wrong == 3) || (table1.length == nbrOfQuestions) || (t.innerText <= 0)) {
        t.innerText = "";
        document.getElementsByClassName("main-window")[0].style.display = "none";
        document.getElementById("scoreBlock").innerText = score / 5;
        document.getElementById("wrongBlock").innerText = wrong;
        /*if (confirm("عذرا إنتهت اللعبة ، هل تريد الإعادة من جديد"))
            document.location.reload(true);
        else
            document.location.replace("Untitled-1.html");
            */
        document.getElementsByClassName("messageBlock")[1].style.display = "block";
    }
    else if (select == true) {
        w.innerText = "";
        for (let index = 0; index < optionNode.length; index++) {
            optionNode[index].style.backgroundColor = "rgb(187, 186, 176)";
        }
        //Setting the data in the block

        do {
            rnd = Math.floor((Math.random() * (nbrOfQuestions)));
        }
        while (isExist(table1, rnd));
        questionNode[0].innerHTML = arr[rnd][0];
        //Filling the 4 option (relating with the question) in random place
        let j = 0;
        table2.length = 0;
        do {
            rnd2 = Math.floor((Math.random() * (4))) + 1;//[1-4] car le[0]contain the question and [5] contain the adress of right answer
            if (isExist(table2, rnd2) == false)
                j++;
        }
        while (j <= 3);
        //optionNode : IS the block that will contain the options
        for (let index = 0; index < 4; index++) {
            let x = table2[index];
            optionNode[index].innerHTML = arr[rnd][x];
            //Storing the nbr of option in the id of optionNode
            optionNode[index].setAttribute("id", x);
        }

        //Storing the question nbr
        questionNode[0].setAttribute("id", "q" + rnd);

        //Mean after I set the data the user of course doesn't yet choose the answer
        select = false;
        if (wrong != 0 || score != 0)
            clearInterval(myInterval);
    }

    else
        w.innerText = "عليك الإجابة أولا";
    //alert("عليك الإجابة أولا");
}


function answersProcessingFunc() {
    if (select == false) {
        select = true;
        //Comme questionNbr compse de 'q' concatinating with question nbr so we use the secpnd index :questionNbr[1]
        let questionNbr = questionNode[0].getAttribute("id");
        let solutionNbr = arr[questionNbr[1]][5];
        let solutionNode = document.getElementById(solutionNbr);
        solutionNode.setAttribute("style", "background-color:green");
        if (this.style.backgroundColor != "green") {
            this.style.backgroundColor = "red";
            wrong += 1;
            document.getElementById("wrong").innerText = wrong;
        }
        else {
            score += 5;
            document.getElementById("score").innerText = score;
        }
        myInterval = setInterval(setDataFunc, 2000);
    }
    else
        w.innerText = "لقد أجبت بالفعل";
}

//let the random viewed question are not repeated in the level
function isExist(table, x) {
    for (let index = 0; index < table.length; index++) {
        if (table[index] == x)
            return true;
    }
    table[table.length] = x;
    return false;
}

function mOverBtn() {
    this.style.backgroundColor = "rgb(255, 17, 0)";
    this.style.borderStyle = "outset";
    this.style.fontWeight = "bolder";
}
function mOutBtn() {
    this.style.backgroundColor = "rgb(255, 136, 0)";
    this.style.borderStyle = "inset";
    this.style.fontWeight = "normal";

}

function startTimer() {
    myInterval2 = setInterval(changeTime, 1000);
}
function changeTime() {
    if (t.innerText > 0)
        t.innerText -= 1;
    else {
        clearInterval(myInterval2);
        setDataFunc();
    }
}

function shadowAnimation(node, delay, n) {
    var time_2 = setInterval(shadow, delay);
    function shadow() {
        if (bool)
            node.style.textShadow = "none";
        else
            node.style.textShadow = "3px 2px red";
        bool = !bool;
        i++;
        if (i > n) {
            clearInterval(time_2);
        }
    }
}

function writingAnimation(node, str, delay) {
    let i = 0;
    let time_ = setInterval(writing, delay);
    function writing() {
        if (i < str.length)
            node.innerText += str.charAt(i++);
        else {
            clearInterval(time_);
            // node.style.fontSize = "150%";
        }
    }

}