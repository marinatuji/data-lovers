window.onload = function () {
  showNews();
  // alert('carregou');
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

function parseDate(date) {
  return new Date(date * 1000);
}

function filterNewsByDate(date) { //validar data
  return getData().filter(eachNews => {
    return parseDate(eachNews["date"]) === date;
  });
}

function filterNewsByTitle(title) { //validar dados se existe
  return getData().filter(eachNews => {
    return parseDate(eachNews["title"]) === title;
  });
}

addEventListener("click", function () {
  let valueInputDate = document.getElementById("idDoInput").value;
  let valueInputTitle = document.getElementById("idDoInput").value;
  let newArray = [];
  if (valueInputDate) {
    newArray = filterNewsByDate(valueInputDate);
  } else if (valueInputTitle) {
    newArray = filterNewsByTitle(valueInputTitle);
  }
  showResult(newArray);
});

function showResult(filterNews) {
  let listNews = document.getElementById("news");
  listNews.innerHTML = `
    ${filterNews.map((eachNews) => `
      <ul class="all-news">
        <li>${eachNews["title"]} / ${eachNews["feedlabel"]}</li>
      </ul>
      `).join("")}
  `
}

function orderByDate() {//challenge
}