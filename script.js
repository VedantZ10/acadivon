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


// Scroll animation (fade-in)
const elements = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
elements.forEach(el => {
const position = el.getBoundingClientRect().top;
const screenHeight = window.innerHeight;

if(position < screenHeight - 100){
el.classList.add("show");
}
});
});


// Smooth scroll for View Dashboard button
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener("click", function(e) {
e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

if(target){
target.scrollIntoView({
behavior: "smooth"
});
}
});
});


// Animate floating cards on scroll
window.addEventListener("scroll", () => {
document.querySelectorAll(".floating-card").forEach(card => {
card.style.transform = `translateY(${window.scrollY * 0.05}px)`;
});
});

function sendMessage(){
const input = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

const userText = input.value.trim();
if(userText === "") return;

// User message
const userMsg = document.createElement("div");
userMsg.className = "user-message";
userMsg.innerText = userText;
chatBox.appendChild(userMsg);

// AI response
const botMsg = document.createElement("div");
botMsg.className = "bot-message";

let reply = "";

// Simple AI logic
if(userText.toLowerCase().includes("attendance")){
  reply = "Try to maintain at least 75%. Attend next classes regularly.";
}
else if(userText.toLowerCase().includes("study plan")){
  reply = "Study 2-3 subjects daily. Focus more on weak subjects.";
}
else if(userText.toLowerCase().includes("low")){
  reply = "Your attendance seems low. Prioritize classes and reduce absences.";
}
else if(userText.toLowerCase().includes("exam")){
  reply = "Revise daily and practice previous papers. Focus on important topics.";
}
else{
  reply = "I suggest focusing on your weak subjects and maintaining consistency.";
}

botMsg.innerText = reply;
chatBox.appendChild(botMsg);

// Auto scroll
chatBox.scrollTop = chatBox.scrollHeight;

input.value = "";
}