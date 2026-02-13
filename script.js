// Future interactivity
function addAttendance() {
  const subject = document.getElementById("subject").value;
  const total = Number(document.getElementById("total").value);
  const attended = Number(document.getElementById("attended").value);

  if (!subject || total <= 0 || attended < 0 || attended > total) {
    alert("Please enter valid details");
    return;
  }

  const percentage = ((attended / total) * 100).toFixed(2);

  let statusClass = "status-safe";
  let statusText = "Safe";

  if (percentage < 75 && percentage >= 60) {
    statusClass = "status-warning";
    statusText = "Warning";
  } else if (percentage < 60) {
    statusClass = "status-danger";
    statusText = "Danger";
  }
function renderAnalysis(subject, percentage, statusText, statusClass) {
  const container = document.getElementById("analysisCards");

  const card = document.createElement("div");
  card.className = `analysis-card ${statusClass}`;

  card.innerHTML = `
    <h3>${subject}</h3>
    <p>${percentage}%</p>
    <span>${statusText}</span>
  `;

  container.appendChild(card);
}

  // 🔹 SAVE DATA TO localStorage
  let data = JSON.parse(localStorage.getItem("attendanceData")) || [];
  data.push({ subject, attended, total });
  localStorage.setItem("attendanceData", JSON.stringify(data));

  // 🔹 ADD ROW TO TABLE
  const row = `
    <tr>
      <td>${subject}</td>
      <td>${attended}</td>
      <td>${total}</td>
      <td>${percentage}%</td>
      <td class="${statusClass}">${statusText}</td>
    </tr>
  `;
  document.getElementById("attendanceData").innerHTML += row;

  // 🔹 REFRESH SUBJECT WISE ANALYSIS
  renderAnalysis();

  // 🔹 CLEAR INPUTS
  document.getElementById("subject").value = "";
  document.getElementById("total").value = "";
  document.getElementById("attended").value = "";
}


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const list = document.getElementById("taskList");
  if (!list) return;

  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <div class="task-actions">
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    list.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;

  tasks.push({ text: input.value, completed: false });
  input.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

document.addEventListener("DOMContentLoaded", renderTasks);

const today = new Date().toDateString();

let dailyData = JSON.parse(localStorage.getItem("dailyTasks")) || {
  date: today,
  tasks: []
};

if (dailyData.date !== today) {
  dailyData = { date: today, tasks: [] };
}

function renderDaily() {
  const list = document.getElementById("dailyList");
  if (!list) return;

  list.innerHTML = "";
  dailyData.tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    li.innerHTML = `
      <span onclick="toggleDaily(${index})">${task.text}</span>
      <button onclick="deleteDaily(${index})">❌</button>
    `;
    list.appendChild(li);
  });

  localStorage.setItem("dailyTasks", JSON.stringify(dailyData));
}

function addDailyTask() {
  const input = document.getElementById("dailyInput");
  if (!input.value.trim()) return;

  dailyData.tasks.push({ text: input.value, done: false });
  input.value = "";
  renderDaily();
}

function toggleDaily(index) {
  dailyData.tasks[index].done = !dailyData.tasks[index].done;
  renderDaily();
}

function deleteDaily(index) {
  dailyData.tasks.splice(index, 1);
  renderDaily();
}

document.addEventListener("DOMContentLoaded", renderDaily);

function renderAnalysis() {
  const container = document.getElementById("analysisCards");
  if (!container) return;

  const data = JSON.parse(localStorage.getItem("attendanceData")) || [];
  container.innerHTML = "";

  data.forEach(subject => {
    const percent = ((subject.attended / subject.total) * 100).toFixed(1);

    let status = "safe";
    let label = "Safe";

    if (percent < 75) {
      status = "danger";
      label = "Danger";
    } else if (percent < 85) {
      status = "warn";
      label = "Warning";
    }

    const card = document.createElement("div");
    card.className = `analysis-card ${status}`;
    card.innerHTML = `
      <h3>${subject.name}</h3>
      <p>Attendance: <strong>${percent}%</strong></p>
      <p>Status: <strong>${label}</strong></p>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderAnalysis);

function renderAnalysis() {
  const container = document.getElementById("analysisCards");
  if (!container) return;

  const data = JSON.parse(localStorage.getItem("attendanceData")) || [];
  container.innerHTML = "";

  data.forEach(item => {
    const percent = ((item.attended / item.total) * 100).toFixed(2);
    let status = "Safe";

    if (percent < 75 && percent >= 60) status = "Warning";
    else if (percent < 60) status = "Danger";

    const card = `
      <div class="analysis-card ${status.toLowerCase()}">
        <h3>${item.subject}</h3>
        <p>${percent}% Attendance</p>
        <span>${status}</span>
      </div>
    `;
    container.innerHTML += card;
  });
}
