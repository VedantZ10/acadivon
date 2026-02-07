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

  document.getElementById("subject").value = "";
  document.getElementById("total").value = "";
  document.getElementById("attended").value = "";
}
