let attendanceList = JSON.parse(localStorage.getItem("attendanceData")) || [];

function saveData() {
    localStorage.setItem("attendanceData", JSON.stringify(attendanceList));
}

function calculateSuggestion(attended, total) {
    let required = 75;
    let percent = (attended / total) * 100;

    if (percent >= required) return "Safe";

    let needed = 0;
    while (((attended + needed) / (total + needed)) * 100 < required) {
        needed++;
    }

    return `Attend next ${needed} class(es)`;
}

function addAttendance() {
    const subject = document.getElementById("subject").value;
    const total = parseInt(document.getElementById("total").value);
    const attended = parseInt(document.getElementById("attended").value);

    if (!subject || total <= 0 || attended < 0 || attended > total) {
        alert("Invalid Input");
        return;
    }

    attendanceList.push({ subject, total, attended });
    saveData();
    renderTable();
}

function deleteAttendance(index) {
    attendanceList.splice(index, 1);
    saveData();
    renderTable();
}

function editAttendance(index) {
    let item = attendanceList[index];

    document.getElementById("subject").value = item.subject;
    document.getElementById("total").value = item.total;
    document.getElementById("attended").value = item.attended;

    attendanceList.splice(index, 1);
    saveData();
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById("attendanceData");
    tbody.innerHTML = "";

    attendanceList.forEach((item, index) => {
        let percentage = ((item.attended / item.total) * 100).toFixed(2);
        let statusClass = "safe";

        if (percentage < 75 && percentage >= 60) statusClass = "warning";
        if (percentage < 60) statusClass = "danger";

        let suggestion = calculateSuggestion(item.attended, item.total);

        tbody.innerHTML += `
        <tr>
            <td>${item.subject}</td>
            <td>${item.attended}</td>
            <td>${item.total}</td>
            <td>${percentage}%<br><small>${suggestion}</small></td>
            <td>
                <div class="progress-bar">
                    <div class="progress-fill" 
                    style="width:${percentage}%; background:${percentage >= 75 ? 'green' : percentage >= 60 ? 'orange' : 'red'}">
                    </div>
                </div>
            </td>
            <td class="${statusClass}">
                ${percentage >= 75 ? "Safe" : percentage >= 60 ? "Warning" : "Danger"}
            </td>
            <td>
                <button class="action-btn edit-btn" onclick="editAttendance(${index})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteAttendance(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
}

renderTable();

// Website loaded check
document.addEventListener("DOMContentLoaded", () => {
    console.log("Acadivon interface loaded successfully");
});