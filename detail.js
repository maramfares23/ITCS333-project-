document.addEventListener("DOMContentLoaded", () => {
  const deleteBtn = document.querySelector(".delete-btn");
  const addCommentBtn = document.querySelector(".add-item-button");
  const commentTextarea = document.querySelector("textarea");
  const commentsSection = document.querySelector(".comments-section");

 
  deleteBtn.addEventListener("click", () => {
    const confirmed = confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      alert("Note deleted.");
 
      window.location.href = "index.html"; // Go back to listing
    }
  });

 
  addCommentBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent link navigation

    const commentText = commentTextarea.value.trim();
    if (commentText) {
      const newComment = document.createElement("div");
      newComment.classList.add("comment");
      newComment.innerHTML = `<p><strong>You:</strong> ${commentText}</p>`;
      commentsSection.insertBefore(newComment, commentTextarea.parentElement);

      commentTextarea.value = ""; // Clear input
    } else {
      alert("Please enter a comment before submitting.");
    }
  });
});w
