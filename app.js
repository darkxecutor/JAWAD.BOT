const checkboxes = document.querySelectorAll("input[type='checkbox']");

const ctx = document.getElementById("barChart").getContext("2d");

let data = JSON.parse(localStorage.getItem("days") || "[]");

// BAR CHART
let chart = new Chart(ctx,{
type:"bar",
data:{
labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets:[{
label:"Progress %",
data:data,
backgroundColor:"#22c55e"
}]
},
options:{
scales:{
y:{beginAtZero:true,max:100}
}
}
});

// update score
function update(){

let done = 0;
checkboxes.forEach(c=>{if(c.checked) done++;});

let score = Math.round((done/checkboxes.length)*100);

document.getElementById("score").innerText = score;

// status
let status = "ضعيف";
if(score>=80) status="ممتاز 🔥";
else if(score>=50) status="متوسط";
else status="ضعيف ⚠️";

document.getElementById("status").innerText = status;

// level
document.getElementById("level").innerText = Math.floor(score/20)+1;
}

// save day
function saveDay(){

let done = 0;
checkboxes.forEach(c=>{if(c.checked) done++;});

let score = Math.round((done/checkboxes.length)*100);

let day = new Date().getDay();

data[day] = score;

localStorage.setItem("days",JSON.stringify(data));

chart.data.datasets[0].data = data;
chart.update();

addHistory(score);
}

// history
function addHistory(score){

let li = document.createElement("li");
li.innerText = "📅 يوم: " + score + "%";

document.getElementById("historyList").appendChild(li);
}

// init
checkboxes.forEach(c=>c.addEventListener("change",update));

update();
