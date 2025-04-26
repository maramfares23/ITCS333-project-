document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.querySelector('.bg-yellow-500');
    const deleteButton = document.querySelector('.bg-red-600');
    const reviewParagraph = document.querySelector('article p');
    const commentsSection = document.querySelector('.space-y-4');
    const backLink = document.querySelector('a[href="course-reviews.html"]');
    
    editButton.addEventListener('click', function() {
      const textArea = document.createElement('textarea');
      textArea.classList.add('w-full', 'p-4', 'rounded-xl', 'border-2', 'border-gray-300');
      textArea.value = reviewParagraph.textContent;
  
      reviewParagraph.replaceWith(textArea);
      editButton.textContent = 'Save';
      editButton.classList.remove('bg-yellow-500');
      editButton.classList.add('bg-green-500');
  
      editButton.addEventListener('click', function() {
        reviewParagraph.textContent = textArea.value;
        textArea.replaceWith(reviewParagraph);
        editButton.textContent = 'Edit';
        editButton.classList.remove('bg-green-500');
        editButton.classList.add('bg-yellow-500');
      });
    });
  
    deleteButton.addEventListener('click', function() {
      const confirmation = confirm('Are you sure you want to delete this review?');
      if (confirmation) {
        reviewParagraph.closest('article').style.display = 'none';
      }
    });
  
    const commentInput = document.createElement('textarea');
    commentInput.placeholder = 'Add a comment...';
    commentInput.classList.add('w-full', 'p-4', 'rounded-xl', 'border-2', 'border-gray-300', 'mt-6');
    
    const commentButton = document.createElement('button');
    commentButton.textContent = 'Post Comment';
    commentButton.classList.add('bg-pink-500', 'text-white', 'px-6', 'py-3', 'rounded-xl', 'mt-2', 'hover:bg-pink-600', 'transition-all');
  
    commentsSection.appendChild(commentInput);
    commentsSection.appendChild(commentButton);
  
    commentButton.addEventListener('click', function() {
      if (commentInput.value.trim()) {
        const newComment = document.createElement('p');
        newComment.classList.add('bg-gray-100', 'p-4', 'rounded-xl');
        newComment.textContent = commentInput.value;
  
        commentsSection.appendChild(newComment);
        commentInput.value = '';
      }
    });
  
    backLink.addEventListener('click', function(e) {
      const confirmation = confirm('Are you sure you want to leave the review detail page?');
      if (!confirmation) {
        e.preventDefault();
      }
    });
  });
  
  
  