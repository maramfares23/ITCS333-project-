const params = new URLSearchParams(location.search);
const groupId = params.get('id');
fetch('groups.json')
  .then(response => response.json()) 
  .then(groups => {
    const group = groups.find(g => g.id == groupId);
    
    if (group) {
      document.getElementById('groupTitle').textContent = group.title;
      document.getElementById('groupSubject').textContent = group.subject;
      document.getElementById('groupLocation').textContent = group.location;
      document.getElementById('groupDate').textContent = group.date;
      document.getElementById('groupTime').textContent = group.time;
      document.getElementById('groupDescription').textContent = group.description;
    } else {
      document.getElementById('detailsContainer').innerHTML = '<p style="color:red;">Group not found.</p>';
    }
  })
  .catch(error => {
    console.error('Error fetching group details:', error);
    document.getElementById('detailsContainer').innerHTML = '<p style="color:red;">Failed to load group details. Please try again later.</p>';
  });
