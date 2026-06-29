const checkboxes = document.querySelectorAll("input[type='checkbox']");
const ctx = document.getElementById("progressChart").getContext("2d");

let chart = new Chart(ctx,{
type:"doughnut",
data:{
labels:["done","left"],
datasets:[{data:[0,100],backgroundColor:["#22c55e","#334155"]}]
}
});

function update(){

let done=0;
checkboxes.forEach(c=>{if(c.checked)done++;});

let percent=Math.round((done/checkboxes.length)*100);

document.getElementById("progressText").innerText=percent+"%";
document.getElementById("progressFill").style.width=percent+"%";

document.getElementById("xp").innerText=done*20;
document.getElementById("level").innerText=Math.floor(done/2)+1;

chart.data.datasets[0].data=[percent,100-percent];
chart.update();

localStorage.setItem("data",JSON.stringify([...checkboxes].map(c=>c.checked)));
}

checkboxes.forEach(c=>c.addEventListener("change",update));

window.onload=()=>{

let saved=JSON.parse(localStorage.getItem("data"));
if(saved){
checkboxes.forEach((c,i)=>c.checked=saved[i]);
}

update();
};

// Dark mode
document.getElementById("darkToggle").onclick=()=>{
document.body.classList.toggle("dark");
}
