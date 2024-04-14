const calendarHeader = document.querySelector(".calendar h3");
const datesContainer = document.querySelector(".dates-generator");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function renderCalendar() {
  const startDate = new Date(currentYear, currentMonth, 1).getDay();
  const endDate = new Date(currentYear, currentMonth + 1, 0).getDate();

  let datesHtml = generatePreviousMonthDays(startDate);
  datesHtml += generateCurrentMonthDays(endDate);
  datesHtml += generateNextMonthDays();

  datesContainer.innerHTML = datesHtml;
  updateHeader();
}

function generatePreviousMonthDays(startDay) {
  let html = "";
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    html += `<li class="inactive">${prevMonthLastDay - i}</li>`;
  }
  return html;
}

function generateCurrentMonthDays(endDate) {
  let html = "";
  for (let i = 1; i <= endDate; i++) {
    const className = (i === currentDate.getDate() &&
      currentMonth === currentDate.getMonth() &&
      currentYear === currentDate.getFullYear()) ? ' class="today"' : "";
    html += `<li${className}>${i}</li>`;
  }
  return html;
}

function generateNextMonthDays() {
  const endDay = new Date(currentYear, currentMonth + 1, 0).getDay();
  let html = "";
  for (let i = 1; i < 6 - endDay; i++) {
    html += `<li class="inactive">${i}</li>`;
  }
  return html;
}

function updateHeader() {
  calendarHeader.textContent = `${months[currentMonth]} ${currentYear}`;
}

function handleNavigation(action) {
  if (action === "prev" && currentMonth === 0) {
    currentYear--;
    currentMonth = 11;
  } else if (action === "next" && currentMonth === 11) {
    currentYear++;
    currentMonth = 0;
  } else {
    currentMonth += (action === "next" ? 1 : -1);
  }

  renderCalendar();
}

prevButton.addEventListener("click", () => handleNavigation("prev"));
nextButton.addEventListener("click", () => handleNavigation("next"));

renderCalendar();
