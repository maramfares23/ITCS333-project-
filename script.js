document.addEventListener('DOMContentLoaded', () => {
  const reviewsContainer = document.querySelector('.reviews-container');
  const loadingIndicator = document.querySelector('.loading-indicator');
  const addReviewForm = document.querySelector('#main-form');

  const reviewTitleInput = document.getElementById('review-title');
  const reviewBodyInput = document.getElementById('review-body');

  if (!reviewTitleInput || !reviewBodyInput) {
    console.error("One of the inputs is missing");
    return;
  }

 
  function createReviewElement(title, body) {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review-item bg-white p-6 rounded-xl shadow-xl';
    reviewElement.innerHTML = `
      <h3 class="text-xl font-semibold text-purple-600">${title}</h3>
      <p class="text-gray-700 mt-2">${body}</p>
    `;
    return reviewElement;
  }

 
  function showLoading() {
    loadingIndicator.textContent = 'Loading reviews...';
  }

 
  function hideLoading() {
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }

 
  function fetchReviews() {
    showLoading();
    fetch('https://raw.githubusercontent.com/ZahraaITCS333/Assignment-THREE/main/course-reviews.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        hideLoading();

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format');
        }

        data.forEach(item => {
          const reviewElement = createReviewElement(item.courseName || 'Untitled Course', item.description || 'No description available.');
          reviewsContainer.appendChild(reviewElement);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        loadingIndicator.textContent = 'Error loading reviews. Please try again later.';
      });
  }
 
  fetchReviews();

 
  addReviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = reviewTitleInput.value.trim();
    const body = reviewBodyInput.value.trim();

    if (!title || !body) {
      alert('Please fill out both fields.');
      return;
    }

    const newReview = createReviewElement(title, body);
    reviewsContainer.prepend(newReview);

    reviewTitleInput.value = '';
    reviewBodyInput.value = '';
  });
});
