document.addEventListener('DOMContentLoaded', () => {
  const calendarDays = document.getElementById('calendarDays');
  const monthYear = document.getElementById('monthYear');
  const prevMonthButton = document.getElementById('prevMonth');
  const nextMonthButton = document.getElementById('nextMonth');
  const eventModal = document.getElementById('eventModal');
  const closeModal = document.querySelector('.close');
  const eventForm = document.getElementById('eventForm');
  const eventDateInput = document.getElementById('eventDate');
  const eventTitleInput = document.getElementById('eventTitle');

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  const events = {};

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Render the calendar for the current month and year
  function renderCalendar(month, year) {
    calendarDays.innerHTML = '';

    monthYear.innerText = `${months[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty boxes for days before the start of the month
    for (let i = 0; i < firstDay; i++) {
      const emptyDiv = document.createElement('div');
      emptyDiv.classList.add('day');
      calendarDays.appendChild(emptyDiv);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDiv = document.createElement('div');
      dayDiv.classList.add('day');
      dayDiv.innerText = i;

      // Format date for event storage
      const eventKey = `${year}-${month + 1}-${i}`;

      // Display events for this day
      if (events[eventKey]) {
        events[eventKey].forEach((event, index) => {
          const eventDiv = document.createElement('div');
          eventDiv.classList.add('event');
          eventDiv.innerText = event;

          // Add delete button
          const deleteButton = document.createElement('button');
          deleteButton.innerText = 'Delete';
          deleteButton.classList.add('delete-btn');
          deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteEvent(eventKey, index);
          });

          eventDiv.appendChild(deleteButton);
          dayDiv.appendChild(eventDiv);
        });
      }

      dayDiv.addEventListener('click', () => {
        eventModal.style.display = 'block';
        eventDateInput.value = `${months[month]} ${i}, ${year}`;
        eventForm.dataset.date = eventKey;
      });

      calendarDays.appendChild(dayDiv);
    }
  }

  function deleteEvent(date, index) {
    events[date].splice(index, 1);
    if (events[date].length === 0) {
      delete events[date];
    }
    renderCalendar(currentMonth, currentYear);
  }

  prevMonthButton.addEventListener('click', () => {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  nextMonthButton.addEventListener('click', () => {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    renderCalendar(currentMonth, currentYear);
  });

  closeModal.addEventListener('click', () => {
    eventModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === eventModal) {
      eventModal.style.display = 'none';
    }
  });

  eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const eventTitle = eventTitleInput.value;
    const eventDate = eventDateInput.value;
    const eventKey = eventForm.dataset.date;

    if (eventTitle && eventDate) {
      if (!events[eventKey]) {
        events[eventKey] = [];
      }
      events[eventKey].push(eventTitle);

      alert(`Event "${eventTitle}" added on ${eventDate}`);
      eventModal.style.display = 'none';
      eventForm.reset();
      renderCalendar(currentMonth, currentYear);
    }
  });

  // Initial render
  renderCalendar(currentMonth, currentYear);
});



