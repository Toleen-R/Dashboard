// Fetch nyheter data från news API
async function fetchNews() {
    const apiKey = '961298228f09454e8c23ed39d3e1d4a2'; 
    const newsApiUrl = 'https://newsapi.org/v2/top-headlines';
    const country = 'se'; 

    try {
        const response = await fetch(`${newsApiUrl}?country=${country}&apiKey=${apiKey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch news data');
        }

        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching news data:', error.message);
        return null;
    }
}

// Skapa en funktion för att uppdatera nyheter sektion
async function updateNewsSection() {
    const newsContainer = document.getElementById('news');

    const newsData = await fetchNews();

    if (newsData) {
        // Ta bort gamla nyheter
        newsContainer.innerHTML = '';

        // visa nyheter
        newsData.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';

            const newsTitle = document.createElement('h4');
            newsTitle.textContent = article.title;

            const newsDescription = document.createElement('p');
            newsDescription.textContent = article.description;

            const newsLink = document.createElement('a');
            newsLink.href = article.url;
            newsLink.target = '_blank';
            newsLink.textContent = 'Read more';

            newsItem.appendChild(newsTitle);
            newsItem.appendChild(newsDescription);
            newsItem.appendChild(newsLink);

            newsContainer.appendChild(newsItem);
        });
    }
}

// Starta funktionen
updateNewsSection();
