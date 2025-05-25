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

setInterval(addTicket, 5000);

// 👇 Joystick logic for future use
const joystick = document.getElementById('joystick-inner');
let dragging = false;
let startX, startY;
let moveX = 0;
let moveY = 0;
const maxDistance = 40;

joystick.addEventListener('pointerdown', (e) => {
  dragging = true;
  startX = e.clientX;
  startY = e.clientY;
  joystick.style.transition = 'none';
  e.target.setPointerCapture(e.pointerId);
});

joystick.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);
  const limitedDistance = Math.min(maxDistance, distance);
  moveX = Math.cos(angle) * limitedDistance;
  moveY = Math.sin(angle) * limitedDistance;
  joystick.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

joystick.addEventListener('pointerup', (e) => {
  dragging = false;
  moveX = 0;
  moveY = 0;
  joystick.style.transition = 'transform 0.3s ease';
  joystick.style.transform = `translate(0, 0)`;
});
