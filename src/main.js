const noteMain = document.getElementById('app');
const noteContainer = document.querySelector('.container');
const templateNote = document.querySelector('.note');
const addNoteBtn = document.querySelector('.add-note');

getNotes().forEach(note => {
  const noteEl = createNoteElement(note.id, note.content);
  noteContainer.insertBefore(noteEl, addNoteBtn);
});

addNoteBtn.addEventListener('click', addNote)

function getNotes() {
  return JSON.parse(localStorage.getItem('stickynotes-notes') || '[]');
}

function saveNotes(notes) {
  localStorage.setItem('stickynotes-notes', JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const newNote = templateNote.cloneNode(true);
  newNote.hidden = false;
  newNote.value = content;
  newNote.placeholder = 'Empty Sticky Note';

  newNote.addEventListener('change', () => {
    updateNote(id, newNote.value);
    console.log(newNote.value);
  });
  newNote.addEventListener('dblclick', () => {
    const doDelete = confirm('Are you sure you wish to delete this sticky note?');
    if (doDelete) {
      deleteNote(id, newNote);

    }
  })

  return newNote;
}

function addNote() {
  const existingNotes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 1000000),
    content: ''
  };

  const noteEl = createNoteElement(noteObj.id, noteObj.content);
  noteContainer.insertBefore(noteEl, addNoteBtn);

  existingNotes.push(noteObj);
  saveNotes(existingNotes);
}

function updateNote(id, newContent) {
  const existingNotes = getNotes();
  const target = existingNotes.filter(note => note.id === id)[0];

  target.content = newContent;
  saveNotes(existingNotes);
}

function deleteNote(id, content) {
  const notes = getNotes().filter(note => note.id !== id);

  saveNotes(notes);
  noteContainer.removeChild(content);
}
