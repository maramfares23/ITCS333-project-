document.addEventListener('DOMContentLoaded', () => {
  const reviewsContainer = document.querySelector('.reviews-container');
  const loadingIndicator = document.querySelector('.loading-indicator');
  const addReviewForm = document.querySelector('#main-form');
  
  const reviewTitleInput = document.getElementById('review-title');
  const reviewBodyInput = document.getElementById('review-body');

   
  if (addReviewForm) {
    if (!reviewTitleInput || !reviewBodyInput) {
      console.error("One of the inputs is missing");
      return;
    }
  
    addReviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const title = reviewTitleInput.value.trim();
      const body = reviewBodyInput.value.trim();
  
      if (title && body) {
        const newReview = createReviewElement(title, body);
      
        if (reviewsContainer) {
          reviewsContainer.prepend(newReview); 
        }
  
        reviewTitleInput.value = '';
        reviewBodyInput.value = '';
      }
    });
  }

  function createReviewElement(title, body) {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review-item bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all ease-in-out mb-6';
    reviewElement.innerHTML = `
      <h3 class="text-xl font-semibold text-purple-600">${title}</h3>
      <p class="text-gray-700 mt-2">${body}</p>
    `;
    return reviewElement;
  }

  if (reviewsContainer) {
    fetch('https://raw.githubusercontent.com/ZahraaITCS333/Assignment-THREE/main/course-reviews.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (loadingIndicator) {
          loadingIndicator.remove();  // إزالة مؤشر التحميل فقط إذا كان العنصر موجودًا
        }

        data.forEach(item => {
          const reviewElement = createReviewElement(item.name, item.body);
           
          reviewsContainer.appendChild(reviewElement);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        if (loadingIndicator) {
          loadingIndicator.textContent = 'Error loading reviews. Please try again later.';
        }
      });
  }

});



