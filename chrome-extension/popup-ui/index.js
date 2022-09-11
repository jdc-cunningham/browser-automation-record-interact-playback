const helperText = document.getElementById('helper-text');
const recordBtn = document.getElementById('record');
const saveBtn = document.getElementById('save');
const display = document.getElementById('container__display');

const initialHelperText = 'Result will be displayed as JSON. Add user credentials if needed. Click record then start interacting with a website.';

recordBtn.addEventListener('click', () => {
  recordBtn.innerText = 'Recording...';
  helperText.innerText = 'When finished, hit save and view result output.';

  saveBtn.addEventListener('click', () => {
    
  });
});

