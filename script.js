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
// Show elements on page load + scroll
const elements = document.querySelectorAll(".fade-in");

function showElements() {
elements.forEach(el => {
const position = el.getBoundingClientRect().top;
const screenHeight = window.innerHeight;

if(position < screenHeight - 50){
el.classList.add("show");
}
});
}

// Run on load
window.addEventListener("load", showElements);

// Run on scroll
window.addEventListener("scroll", showElements);


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
let reply = generateReply(userText);
// Auto scroll
chatBox.scrollTop = chatBox.scrollHeight;

input.value = "";
}

function generateReply(text){

text = text.toLowerCase();

if(text.includes("javascript")){
return "JavaScript is a programming language used to make websites interactive.";
}

if(text.includes("python")){
return "Python is used for AI, web development, and automation.";
}

if(text.includes("study plan")){
return "Study 2-3 subjects daily and focus more on weak areas.";
}

if(text.includes("attendance")){
return "Maintain at least 75% attendance to stay safe.";
}

if(text.includes("exam")){
return "Revise regularly and practice previous papers.";
}

return "I'm here to help! Ask me about studies, attendance, or programming 😊";
}