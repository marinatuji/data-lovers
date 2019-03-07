window.onload = function () {
  showNews();
  alert('carregou');
};

function getData() {
  return STEAM['appnews']['newsitems'];
}

function showNews() {
  let listNews = document.getElementById("news");
  listNews.innerHTML = `
    ${getData().map((news) => `
      <ul class="all-news">
        <li>${news["title"]} / ${news["feedlabel"]}</li>
      </ul>
      `).join("")}
  `
}

function filterNews() {

}

function orderByDate() {
}