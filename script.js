let uptime = 100;
let money = 0;

function addTicket() {
  const problems = [
    "Printer not working",
    "Computer won’t start",
    "Suspicious email clicked",
    "Wi-Fi keeps dropping",
    "Software needs update",
    "Forgot password (again)"
  ];

  const fixes = {
    "Printer not working": "Restart printer",
    "Computer won’t start": "Check power cable",
    "Suspicious email clicked": "Run antivirus",
    "Wi-Fi keeps dropping": "Restart router",
    "Software needs update": "Install updates",
    "Forgot password (again)": "Reset password"
  };

  const problem = problems[Math.floor(Math.random() * problems.length)];
  const ticket = document.createElement("div");
  ticket.className = "ticket";
  ticket.innerHTML = `<p>${problem}</p>
    <button onclick="solveTicket(this, '${fixes[problem]}')">Fix</button>`;
  document.getElementById("tickets").appendChild(ticket);
}

function solveTicket(button, correctFix) {
  const result = prompt("What fix do you want to try?");
  const ticket = button.parentElement;

  if (result === correctFix) {
    money += 50;
    uptime = Math.min(100, uptime + 5);
    ticket.innerHTML += "<p style='color:lightgreen;'>✅ Fixed!</p>";
  } else {
    uptime -= 10;
    ticket.innerHTML += "<p style='color:red;'>❌ Wrong fix!</p>";
  }

  document.getElementById("money").textContent = money;
  document.getElementById("uptime").textContent = uptime + "%";

  setTimeout(() => ticket.remove(), 3000);
}

// Add new tickets every 5 seconds
setInterval(addTicket, 5000);
