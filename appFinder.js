const API_URL = 'groups.json';
const groupList = document.getElementById('groupList');
const searchInput = document.getElementById('searchInput');
const subjectFilter = document.getElementById('subjectFilter');
let currentPage = 1;
const groupsPerPage = 5;
let allGroups = [];
async function fetchStudyGroups() {
    showLoading();
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        allGroups = data.slice(0, 10); 
        renderCurrentPage();
    } catch (error) {
        console.error('Error fetching study groups:', error);
        showError();
    }
}

function renderGroups(groups) {
    groupList.innerHTML = '';
    groups.forEach(group => {
      const groupItem = document.createElement('article');
      groupItem.innerHTML = `
        <h2>${group.title}</h2>
        <p>
          <strong>Subject:</strong> ${group.subject}<br>
          <strong>Location:</strong> ${group.location}<br>
          <strong>Date & Time:</strong> ${group.date} ${group.time}
        </p>
        <a href="detail.html?id=${group.id}" role="button">View Details</a>
      `;
      groupList.appendChild(groupItem);
    });
  }
function renderCurrentPage() {
    const start = (currentPage - 1) * groupsPerPage;
    const end = start + groupsPerPage;
    renderGroups(allGroups.slice(start, end));
}
function showLoading() {
    groupList.innerHTML = '<p>Loading study groups...</p>';
}
function showError() {
    groupList.innerHTML = '<p style="color:red;">Failed to load study groups. Please try again later.</p>';
}
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();

    const articles = groupList.querySelectorAll('article');
    articles.forEach(article => {
        const title = article.querySelector('h2').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            article.style.display = '';
        } else {
            article.style.display = 'none';
        }
    });
});

document.getElementById('prevPage').addEventListener('click', function (e) {
    e.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        renderCurrentPage();
    }
});

document.getElementById('nextPage').addEventListener('click', function (e) {
    e.preventDefault();
    if (currentPage * groupsPerPage < allGroups.length) {
        currentPage++;
        renderCurrentPage();
    }
});
subjectFilter.addEventListener('change', function () {
    const selectedSubject = subjectFilter.value;
    const allArticles = groupList.querySelectorAll('article');

    allArticles.forEach(article => {
        const subjectText = article.querySelector('p').textContent.toLowerCase();
        if (selectedSubject === 'All courses' || subjectText.includes(selectedSubject.toLowerCase())) {
            article.style.display = '';
        } else {
            article.style.display = 'none';
        }
    });
});
fetchStudyGroups();
