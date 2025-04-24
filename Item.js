document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".item-form");
  const cancelBtn = document.querySelector(".cancel-btn");


  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent actual form submission

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const content = document.getElementById("content").value.trim();

    if (title && description && content) {
      // You can replace this with your backend call (e.g., fetch or AJAX)
      console.log("Form Submitted:");
      console.log("Title:", title);
      console.log("Description:", description);
      console.log("Content:", content);

      alert("Note submitted successfully!");
      form.reset(); // Clear form after submission
    } else {
      alert("Please fill out all fields.");
    }
  });


  cancelBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to cancel?")) {
      form.reset();
    }
  });
});
