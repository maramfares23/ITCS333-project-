document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.querySelector(".search-bar");
  const sortSelect = document.getElementById("sort");
  const itemGrid = document.querySelector(".item-grid");
  const itemCards = Array.from(document.querySelectorAll(".item-card"));

 
  searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    itemCards.forEach(card => {
      const title = card.querySelector("h2").textContent.toLowerCase();
      const desc = card.querySelector(".description").textContent.toLowerCase();
      const matches = title.includes(query) || desc.includes(query);
      card.style.display = matches ? "block" : "none";
    });
  });

 
  sortSelect.addEventListener("change", () => {
    const sortBy = sortSelect.value;
    let sortedCards;

    if (sortBy === "title") {
      sortedCards = itemCards.sort((a, b) => {
        const titleA = a.querySelector("h2").textContent.toLowerCase();
        const titleB = b.querySelector("h2").textContent.toLowerCase();
        return titleA.localeCompare(titleB);
      });
    } else if (sortBy === "date") {

      sortedCards = itemCards.reverse(); // Dummy reverse to simulate date sort
    }

 
    itemGrid.innerHTML = "";
    sortedCards.forEach(card => itemGrid.appendChild(card));
  });
});
