import myHttp from "./myHttp";
import newsTemplate from "./newsTempl";

// Init http module
const http = myHttp();
const newsService = (function() {
    const apiKey = "9c27b0f722b84da5a08312d2b125351b";
    const apiUrl = "https://newsapi.org/v2";

    return {
        topHeadlines(country = "ua", cb) {
            http.get(
                `${apiUrl}/top-headlines?country=${country}&category=technology&apiKey=${apiKey}`,
                cb
            );
        },
        everything(text) {
            http.get(`${apiUrl}/everything?q=${text}&apiKey=${apiKey}`, cb);
        }
    };
})();

// Elements
const newsContainer = document.querySelector(".news-container .row");

document.addEventListener("DOMContentLoaded", function() {
    M.AutoInit();
    loadNews();
});

function loadNews() {
    newsService.topHeadlines("ua", onGetResponse);
}

function onGetResponse(err, res) {
    if (err) {
        alert(err);
        return;
    }

    if (!res.articles.length) {
        alert("Новостей не найдено");
        return;
    }

    renderNews(res.articles);
}

function renderNews(newsItems) {
    let fragment = "";

    newsItems.forEach(item => {
        const el = newsTemplate(item);
        console.log(el);
        fragment += el;
    });

    newsContainer.insertAdjacentHTML("afterbegin", fragment);
}