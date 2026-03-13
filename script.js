// smooth button click animation

const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {

btn.addEventListener("click", () => {

btn.style.transform = "scale(0.95)";

setTimeout(()=>{

btn.style.transform = "scale(1)";

},150);

});

});

function calculateAttendance(){

const rows=document.querySelectorAll("#attendanceTable tr");
let totalPercent=0;
let subjects=0;

rows.forEach((row,index)=>{

if(index===0) return;

const checkboxes=row.querySelectorAll("input");
const percentCell=row.querySelector(".percent");
const statusCell=row.querySelector(".status");

let present=0;

checkboxes.forEach(box=>{
if(box.checked) present++;
});

let percentage=(present/checkboxes.length)*100;

percentCell.innerText=percentage.toFixed(0)+"%";

if(percentage>=85){
statusCell.innerText="Excellent";
statusCell.style.color="green";
}
else if(percentage>=75){
statusCell.innerText="Average";
statusCell.style.color="orange";
}
else{
statusCell.innerText="Needs Attention";
statusCell.style.color="red";
}

totalPercent+=percentage;
subjects++;

});

let overall=(totalPercent/subjects).toFixed(0);
document.getElementById("overallPercent").innerText=overall+"%";

}