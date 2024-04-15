class Calendar {
  constructor(calendarHeaderSelector, datesContainerSelector, prevButtonId, nextButtonId) {
    this.calendarHeader = document.querySelector(calendarHeaderSelector);
    this.datesContainer = document.querySelector(datesContainerSelector);
    this.prevButton = document.getElementById(prevButtonId);
    this.nextButton = document.getElementById(nextButtonId);

    this.months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();

    this.renderCalendar();
    this.setupEventListeners();
  }

  renderCalendar() {
    const startDate = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const endDate = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    let datesHtml = this.generatePreviousMonthDays(startDate);
    datesHtml += this.generateCurrentMonthDays(endDate);
    datesHtml += this.generateNextMonthDays();

    this.datesContainer.innerHTML = datesHtml;
    this.updateHeader();
  }

  generatePreviousMonthDays(startDay) {
    let html = "";
    const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      html += `<li class="inactive">${prevMonthLastDay - i}</li>`;
    }
    return html;
  }

  generateCurrentMonthDays(endDate) {
    let html = "";
    for (let i = 1; i <= endDate; i++) {
      const className = (i === this.currentDate.getDate() &&
        this.currentMonth === this.currentDate.getMonth() &&
        this.currentYear === this.currentDate.getFullYear()) ? ' class="today"' : "";
      html += `<li${className}>${i}</li>`;
    }
    return html;
  }

  generateNextMonthDays() {
    const endDay = new Date(this.currentYear, this.currentMonth + 1, 0).getDay();
    let html = "";
    for (let i = 1; i < 6 - endDay; i++) {
      html += `<li class="inactive">${i}</li>`;
    }
    return html;
  }

  updateHeader() {
    this.calendarHeader.textContent = `${this.months[this.currentMonth]} ${this.currentYear}`;
  }

  handleNavigation(action) {
    if (action === "prev" && this.currentMonth === 0) {
      this.currentYear--;
      this.currentMonth = 11;
    } else if (action === "next" && this.currentMonth === 11) {
      this.currentYear++;
      this.currentMonth = 0;
    } else {
      this.currentMonth += (action === "next" ? 1 : -1);
    }

    this.renderCalendar();
  }

  setupEventListeners() {
    this.prevButton.addEventListener("click", () => this.handleNavigation("prev"));
    this.nextButton.addEventListener("click", () => this.handleNavigation("next"));
  }
}

const Calendar1 = new Calendar(".calendar h3", ".dates-generator", "prev", "next");
