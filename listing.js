const form = document.getElementById('groupForm');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = document.getElementById('title').value.trim();
  const course = document.getElementById('course').value.trim();
  const location = document.getElementById('location').value.trim();
  const date = document.getElementById('date').value.trim();
  const time = document.getElementById('time').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!title || !course || !location || !date || !time) {
    alert('Please fill');
    return; 
  }
  const today = new Date();
  const selectedDate = new Date(date);
  if (selectedDate < today) {
    alert('Please select a future date.');
    return;
  }
  alert('Group created successfully');

  form.reset();
});