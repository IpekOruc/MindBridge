document.addEventListener('DOMContentLoaded', () => {
  const noteInput = document.getElementById('note-input');
  const addNoteBtn = document.getElementById('add-note-btn');
  const noteContainer = document.getElementById('note-container');

  addNoteBtn.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText) {
      const note = document.createElement('div');
      note.className = 'note';
      note.textContent = noteText;
      noteContainer.appendChild(note);
      noteInput.value = '';
    }
  });

  const habitBody = document.getElementById('habit-body');
  const addHabitBtn = document.getElementById('add-habit-btn');

  addHabitBtn.addEventListener('click', () => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><input type="text" placeholder="Habit"></td>
      <td><input type="checkbox"></td>
      <td><input type="checkbox"></td>
      <td><input type="checkbox"></td>
      <td><input type="checkbox"></td>
      <td><input type="checkbox"></td>
      <td><input type="checkbox"></td>
      <td><input type="checkbox"></td>
    `;
    habitBody.appendChild(newRow);
  });
});
