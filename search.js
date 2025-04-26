class NewsSearch {
    constructor() {
        this.articles = [];
        this.initializeSearchBar();
        this.loadArticles();
        this.setupEventListeners();
    }

    initializeSearchBar() {
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
            <div id="searchResults" class="search-results"></div>
        `;

        const blogSection = document.querySelector('.blog-section');
        const cardsContainer = document.querySelector('.cards');
        blogSection.insertBefore(searchContainer, cardsContainer);
    }

    loadArticles() {
        const cards = document.querySelectorAll('.card');
        this.articles = Array.from(cards).map(card => {
            const title = card.querySelector('h4').textContent;
            const content = card.querySelector('p').textContent;
            const dateStr = card.querySelector('.posted-date').textContent.replace('Published: ', '');
            const date = new Date(dateStr);
            return {
                element: card,
                title,
                content,
                date,
                dateStr
            };
        });

        // Set initial date range based on available articles
        if (this.articles.length > 0) {
            const dates = this.articles.map(article => article.date);
            const minDate = new Date(Math.min(...dates));
            const maxDate = new Date(Math.max(...dates));
            
            document.getElementById('startDate').value = this.formatDateForInput(minDate);
            document.getElementById('endDate').value = this.formatDateForInput(maxDate);
        }
    }

    formatDateForInput(date) {
        return date.toISOString().split('T')[0];
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const sortOrder = document.getElementById('sortOrder');
        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');

        let debounceTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => this.filterAndSortArticles(), 300);
        });

        sortOrder.addEventListener('change', () => this.filterAndSortArticles());
        startDate.addEventListener('change', () => this.filterAndSortArticles());
        endDate.addEventListener('change', () => this.filterAndSortArticles());
    }

    filterAndSortArticles() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const sortOrder = document.getElementById('sortOrder').value;
        const startDate = new Date(document.getElementById('startDate').value);
        const endDate = new Date(document.getElementById('endDate').value);

        let filteredArticles = this.articles.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchTerm) ||
                                article.content.toLowerCase().includes(searchTerm);

            const articleDate = article.date;
            const matchesDate = (!startDate || isNaN(startDate.getTime()) || articleDate >= startDate) &&
                               (!endDate || isNaN(endDate.getTime()) || articleDate <= endDate);

            return matchesSearch && matchesDate;
        });

        filteredArticles = this.sortArticles(filteredArticles, sortOrder);
        this.updateDisplay(filteredArticles);
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

    updateDisplay(filteredArticles) {
        const cardsContainer = document.querySelector('.cards');
        const searchResults = document.getElementById('searchResults');
        
        if (filteredArticles.length === 0) {
            searchResults.textContent = 'No results found';
            searchResults.style.display = 'block';
            cardsContainer.style.display = 'none';
            return;
        }

        searchResults.style.display = 'none';
        cardsContainer.style.display = 'grid';

        // Hide all articles first
        this.articles.forEach(article => {
            article.element.style.display = 'none';
        });

        // Show only filtered articles
        filteredArticles.forEach(article => {
            article.element.style.display = 'block';
        });

        // Highlight search terms
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        if (searchTerm) {
            filteredArticles.forEach(article => {
                this.highlightSearchTerm(article.element, searchTerm);
            });
        }
    }

    highlightSearchTerm(element, searchTerm) {
        const title = element.querySelector('h4');
        const content = element.querySelector('p');

        title.innerHTML = this.getHighlightedText(title.textContent, searchTerm);
        content.innerHTML = this.getHighlightedText(content.textContent, searchTerm);
    }

    getHighlightedText(text, searchTerm) {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
}

// Initialize search functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NewsSearch();
});
