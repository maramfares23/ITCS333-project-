class NewsSearch {
    constructor() {
        this.articles = [];
        this.initializeSearchBar();
        this.loadArticles();
        this.setupEventListeners();
    }

    initializeSearchBar() {
        // Create search container
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-bar">
                <input type="text" id="searchInput" placeholder="Search news..." class="search-input">
                <div class="search-filters">
                    <select id="sortOrder" class="search-select">
                        <option value="">Sort By</option>
                        <option value="az">Title A-Z</option>
                        <option value="za">Title Z-A</option>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                    <div class="date-filter">
                        <input type="date" id="startDate" class="search-date">
                        <span>to</span>
                        <input type="date" id="endDate" class="search-date">
                    </div>
                </div>
            </div>
        `;

        // Insert search bar before the cards container
        const blogSection = document.querySelector('.blog-section');
        const cardsContainer = document.querySelector('.cards');
        blogSection.insertBefore(searchContainer, cardsContainer);
    }

    loadArticles() {
        const cards = document.querySelectorAll('.card');
        this.articles = Array.from(cards).map(card => {
            const title = card.querySelector('h4').textContent;
            const content = card.querySelector('p').textContent;
            const dateStr = card.querySelector('.posted-date p').textContent.replace('posted on ', '');
            const date = this.parseDate(dateStr);
            return {
                element: card,
                title,
                content,
                date,
                dateStr
            };
        });
    }

    parseDate(dateStr) {
        const months = {
            'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
            'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
        };
        const [month, day, year] = dateStr.split(' ');
        return new Date(year, months[month.toLowerCase()], parseInt(day));
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const sortOrder = document.getElementById('sortOrder');
        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');

        // Debounce search input
        let debounceTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => this.filterAndSortArticles(), 300);
        });

        // Add event listeners for filters
        sortOrder.addEventListener('change', () => this.filterAndSortArticles());
        startDate.addEventListener('change', () => this.filterAndSortArticles());
        endDate.addEventListener('change', () => this.filterAndSortArticles());
    }

    filterAndSortArticles() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const sortOrder = document.getElementById('sortOrder').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        let filteredArticles = this.articles.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchTerm) ||
                                 article.content.toLowerCase().includes(searchTerm);

            const matchesDate = this.checkDateRange(article.date, startDate, endDate);

            return matchesSearch && matchesDate;
        });

        // Apply sorting
        filteredArticles = this.sortArticles(filteredArticles, sortOrder);

        // Update visibility
        this.articles.forEach(article => {
            article.element.style.display = 'none';
        });

        filteredArticles.forEach(article => {
            article.element.style.display = 'block';
        });
    }

    checkDateRange(articleDate, startDate, endDate) {
        if (!startDate && !endDate) return true;

        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date(8640000000000000);

        return articleDate >= start && articleDate <= end;
    }

    sortArticles(articles, sortOrder) {
        switch (sortOrder) {
            case 'az':
                return articles.sort((a, b) => a.title.localeCompare(b.title));
            case 'za':
                return articles.sort((a, b) => b.title.localeCompare(a.title));
            case 'newest':
                return articles.sort((a, b) => b.date - a.date);
            case 'oldest':
                return articles.sort((a, b) => a.date - b.date);
            default:
                return articles;
        }
    }
}

// Initialize search functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NewsSearch();
});
