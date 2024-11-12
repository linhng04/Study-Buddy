let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
const today = new Date();
let events = [];
let editingEvent = null;
let selectedDayInMonth = null;

function createMonthCalendar() {
  const monthCalendar = document.getElementById("month-calendar");
  monthCalendar.innerHTML = "";
  const header = document.createElement("div");
  header.className = "header";
  const monthTitle = document.createElement("div");
  monthTitle.className = "month-title";
  monthTitle.textContent = `${getMonthName(currentMonth)} ${currentYear}`;

  const monthList = document.createElement("div");
  monthList.className = "month-list";
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  months.forEach((m, index) => {
    const monthItem = document.createElement("div");
    monthItem.textContent = m;
    monthItem.onclick = () => {
      currentMonth = index;
      createMonthCalendar();
    };
    monthList.appendChild(monthItem);
  });
  monthTitle.appendChild(monthList);
  header.appendChild(monthTitle);
  const navContainer = document.createElement("div");
  const prevButton = document.createElement("button");
  prevButton.className = "nav-button";
  prevButton.textContent = "<";
  prevButton.onclick = () => changeMonth(-1);
  navContainer.appendChild(prevButton);
  const nextButton = document.createElement("button");
  nextButton.className = "nav-button";
  nextButton.textContent = ">";
  nextButton.onclick = () => changeMonth(1);
  navContainer.appendChild(nextButton);
  header.appendChild(navContainer);
  monthCalendar.appendChild(header);

  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]; // Thay đổi thứ tự
  const calendarGrid = document.createElement("div");
  calendarGrid.className = "calendar";
  days.forEach((day) => {
    const dayHeader = document.createElement("div");
    dayHeader.className = "day";
    dayHeader.textContent = day;
    calendarGrid.appendChild(dayHeader);
  });

  const date = new Date(currentYear, currentMonth, 1);
  const firstDayIndex = (date.getDay() + 6) % 7; // Định nghĩa lại để thứ Hai là ngày đầu tiên
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Thêm ô trống cho các ngày trước ngày đầu tiên của tháng
  for (let i = 0; i < firstDayIndex; i++) {
    calendarGrid.appendChild(document.createElement("div"));
  }

  // Thêm các ngày vào lịch
  for (let day = 1; day <= lastDay; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.textContent = day;

    const currentDate = new Date(currentYear, currentMonth, day);
    if (currentDate.toDateString() === today.toDateString()) {
      dayDiv.classList.add("today");
    }

    dayDiv.onclick = () => selectDate(day, dayDiv);
    calendarGrid.appendChild(dayDiv);
  }

  monthCalendar.appendChild(calendarGrid);
}

function getMonthName(monthIndex) {
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  return months[monthIndex];
}

function changeMonth(direction) {
  currentMonth += direction;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  createMonthCalendar();
}

function createWeekCalendar(startDate) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";
  const days = [
    "THỨ 2",
    "THỨ 3",
    "THỨ 4",
    "THỨ 5",
    "THỨ 6",
    "THỨ 7",
    "CHỦ NHẬT",
  ];
  const hours = Array.from(
    { length: 24 },
    (_, i) => (i < 10 ? "0" : "") + i + ":00"
  );

  const headerTime = document.createElement("div");
  headerTime.className = "header";
  headerTime.textContent = "Thời gian";
  calendar.appendChild(headerTime);
  console.log(startDate, "startDate");

  const firstDayOfWeek = new Date(startDate);
  const dayOfWeek = startDate.getDay();
  firstDayOfWeek.setDate(
    startDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
  ); // Đảm bảo Thứ Hai là ngày đầu tuần

  days.forEach((day, index) => {
    const headerEl = document.createElement("div");
    headerEl.className = "header";
    headerEl.textContent = day;

    const currentDate = new Date(firstDayOfWeek);
    currentDate.setDate(firstDayOfWeek.getDate() + index);

    if (
      currentDate.getDate() === selectedDayInMonth &&
      currentDate.getMonth() === currentMonth
    ) {
      headerEl.style.color = "red";
    }

    if (currentDate.toDateString() === today.toDateString()) {
      headerEl.style.color = "blue";
    }

    headerEl.onclick = () => {
      showEventPopup(currentDate);
    };

    calendar.appendChild(headerEl);
    const dateEl = document.createElement("div");
    dateEl.textContent = `${currentDate.getDate()}/${currentDate.getMonth() + 1
      }`;
    headerEl.appendChild(dateEl);
  });

  for (let hour = 0; hour < 24; hour++) {
    const hourRow = document.createElement("div");
    hourRow.className = "time-slot";
    hourRow.textContent = `${hour.toString().padStart(2, "0")}:00`;
    calendar.appendChild(hourRow);

    days.forEach(() => {
      const daySlot = document.createElement("div");
      daySlot.className = "day-slot";
      calendar.appendChild(daySlot);
    });
  }

  renderEvents(startDate);
}

function selectDate(day, dayDiv) {
  const allDays = document.querySelectorAll(".month-calendar .day");
  allDays.forEach((d) => {
    d.classList.remove("selected");
  });
  dayDiv.classList.add("selected");
  selectedDayInMonth = day;

  const todayDiv = Array.from(allDays).find(
    (d) =>
      d.textContent == today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
  );
  if (todayDiv) {
    todayDiv.classList.add("today");
  }

  const date = new Date(currentYear, currentMonth, day);
  const startOfWeek =
    date.getDate() - (date.getDay() === 0 ? 6 : date.getDay() - 1);
  const startDate = new Date(currentYear, currentMonth, startOfWeek);
  createWeekCalendar(startDate);
}

function renderEvents(startDate) {
  const daySlots = document.getElementsByClassName("day-slot");
  const dayOfWeek = startDate.getDay(); // 0 (Chủ Nhật) đến 6 (Thứ Bảy)

  // Thứ Hai là ngày đầu tuần, nên startOfWeek = 1
  const startOfWeek = 1;

  // Tính offsetDays để có được vị trí đầu tuần (Thứ Hai)
  const offsetDays = (dayOfWeek >= startOfWeek ? dayOfWeek - startOfWeek : dayOfWeek - startOfWeek - 7);
  console.log(events, 'events');

  events.forEach((event) => {
    const eventDate = new Date(event.date);
    console.log(eventDate, 'eventDate');

    const dayIndex = Math.floor((eventDate - startDate) / (1000 * 60 * 60 * 24)) + offsetDays;
    console.log(dayIndex, 'dayIndex');
    if (dayIndex >= 0 && dayIndex < 7) {
      const startHour = parseInt(event.start.split(":")[0]);
      const startMinutes = parseInt(event.start.split(":")[1]);
      const endHour = parseInt(event.end.split(":")[0]);
      const endMinutes = parseInt(event.end.split(":")[1]);
      const statusText = event.completed ? "Đã hoàn thành" : "Chưa hoàn thành";
      const eventEl = document.createElement("div");
      eventEl.className = "event";
      eventEl.textContent = `${event.name}\n(${event.start} - ${event.end})\n${statusText}`;
      eventEl.style.whiteSpace = "pre-wrap";

      // Tính vị trí cột và hàng dựa trên dayIndex và thời gian bắt đầu
      const position = dayIndex + startHour * 7; // Sử dụng dayIndex để đảm bảo đúng cột
      // Tính toán thời gian bắt đầu và chiều cao của sự kiện
      const height = ((endHour * 60 + endMinutes) - (startHour * 60 + startMinutes));

      eventEl.style.top = `${startMinutes}px`;
      eventEl.style.height = `${height}px`;
      eventEl.style.backgroundColor = event.color === "blue" ? "#66B2FF" : "#D1A6E0";
      eventEl.style.color = event.completed ? "white" : "black";
      if (!event.completed) {
        eventEl.onclick = () => showEditEventPopup(event);
      } else {
        eventEl.style.cursor = "not-allowed"; // Thêm con trỏ không cho phép chỉnh sửa
      }
      daySlots[position].appendChild(eventEl);
    }
  });
}

function showEventPopup(targetDate) {
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("event-popup");
  overlay.style.display = "block";
  popup.style.display = "block";

  const dateString = new Date(
    targetDate.getTime() - targetDate.getTimezoneOffset() * 60000
  )
    .toISOString()
    .substring(0, 10);
  document.getElementById("event-date").value = dateString;

  const startHour = "--";
  document.getElementById("event-start").value = `${startHour}:00`;

  const endHour = "--";
  document.getElementById("event-end").value = `${endHour}:00`;
}

function closeEventPopup() {
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("event-popup");
  overlay.style.display = "none";
  popup.style.display = "none";
  // Xóa trạng thái chỉnh sửa sau khi đóng popup
  editingEvent = null;
}
//thêm mới ghi chú
function addNewEvent(event) {
  event.preventDefault();
  const name = document.getElementById("event-name").value;
  const date = document.getElementById("event-date").value;
  const start = document.getElementById("event-start").value;
  const end = document.getElementById("event-end").value;
  const completed = document.getElementById("completed").checked;
  const color = document.querySelector('input[name="color"]:checked').value;
  // Kiểm tra nếu khoảng thời gian này đã có ghi chú chưa
  console.log(editingEvent, 'editingEvent');


  if (editingEvent) {
    // Nếu đang chỉnh sửa, cập nhật các thuộc tính của sự kiện hiện tại
    editingEvent.name = name;
    editingEvent.date = date;
    editingEvent.start = start;
    editingEvent.end = end;
    editingEvent.completed = completed;
    editingEvent.color = color;
    const isOverlap = events.some(e => {
      return e !== editingEvent && e.date === date &&
        ((start >= e.start && start < e.end) || (end > e.start && end <= e.end) ||
          (start <= e.start && end >= e.end));
    });

    if (isOverlap) {
      alert("Khoảng thời gian này đã có ghi chú. Vui lòng chọn thời gian khác.");
      return;
    }
    editingEvent = null; // Xóa trạng thái chỉnh sửa sau khi lưu
  } else {
    // Nếu là sự kiện mới, thêm vào danh sách
    const isOverlap = events.some(e => {
      return e.date === date &&
        ((start >= e.start && start < e.end) || (end > e.start && end <= e.end) ||
          (start <= e.start && end >= e.end));
    });

    if (isOverlap) {
      alert("Khoảng thời gian này đã có ghi chú. Vui lòng chọn thời gian khác.");
      return;
    }
    events.push({ name, date, start, end, completed, color });
  }

  // events.push({ name, date, start, end, completed, color });
  closeEventPopup();
  createWeekCalendar(new Date(date));

}
//sửa ghi chú
function showEditEventPopup(event) {
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("event-popup");
  overlay.style.display = "block";
  popup.style.display = "block";
  document.getElementById("event-popup-title").textContent = "Sửa sự kiện";
  document.getElementById("event-name").value = event.name;
  document.getElementById("event-date").value = event.date;
  document.getElementById("event-start").value = event.start;
  document.getElementById("event-end").value = event.end;
  document.getElementById("completed").checked = event.completed;
  document.querySelector(`input[name="color"][value="${event.color}"]`).checked = true;
  console.log(event, 'event');

  editingEvent = event;
}
window.onload = () => {
  createMonthCalendar();
  createWeekCalendar(today);
};
