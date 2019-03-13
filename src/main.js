window.onload = function () {
  showAllNews();
  showSortNews();
  showGroupByMonth();
};

function getData() {
  return STEAM['appnews']['newsitems'];
}

function showAllNews() {
  let listNews = document.getElementById("list-news");
  listNews.innerHTML = `
    ${getData().map((news) => `
      <li>${news["title"]} / ${news["feedlabel"]} <br>
      in ${parseDate(news["date"])} - <a class="anchor-list-news" href="${news["url"]}">Leia mais</a></li>
      `).join("")}
  `
}

function parseDate(date) {
  return new Date(date * 1000).toLocaleDateString("pt-br");
}

function catchMonth(date) {
  return new Date(date * 1000).getMonth() + 1;
}

function filterNewsByDate(date) { //validar data
  return getData().filter(eachNews => {
    return parseDate(eachNews["date"]) === date;
  });
}

function filterNewsByTitle(title) { //validar dados se existe
  return getData().filter(eachNews => {
    return eachNews["title"].includes(title);
  });
}

const btnFilter = document.querySelector("input[name='filter']");
btnFilter.addEventListener("click", function (event) {
  event.preventDefault();
  let valueInputDate = document.querySelector("input[name='byDate']").value;
  let valueInputTitle = document.querySelector(".input-by-title").value;
  let newArray = [];
  if (valueInputDate) {
    newArray = filterNewsByDate(valueInputDate);
  } else if (valueInputTitle) {
    newArray = filterNewsByTitle(valueInputTitle);
  }
  showFilteredNews(newArray);
});

function showFilteredNews(filterNews) {
  if (filterNews.length === 0) {
    alert("Inválido");
  }
  let filteredNews = document.querySelector("#show-filtered-news");
  filteredNews.innerHTML = `
      ${filterNews.map((eachNews) => `
        <div class="list-filtered-news"><h3${eachNews["title"]} <br> ${eachNews["feedlabel"]} in ${parseDate(eachNews["date"])}
        </div>
         `).join("")}
    `
}

function showSortNews() {
  let sortNews = document.querySelector(".show-sort-news");
  sortNews.innerHTML = `
    ${sortNewest().map((eachNews) => `
      <div>${eachNews["title"]} / ${parseDate(eachNews["date"])}</div>
      `).join("")}
  `
}

function sortNewest() {
  return getData().sort((a, b) => {
    if (parseDate(b["date"]) < parseDate(a["date"])) {
      return -1;
    } if (parseDate(a["date"]) > parseDate(b["date"])) {
      return 1;
    }
    return 0;
  });
}

function showGroupByMonth() {
  let groupNews = document.querySelector(".show-data-set");
  groupNews.innerHTML = `
    ${groupByMonth().map((frequency,index) => `
      <div>${index} | ${frequency}</div>
      `).join("")}
  `
}

function groupByMonth() {
  return getData().reduce((acc, obj) => {
    var key = catchMonth(obj["date"]);
    if (!acc[key]) { //negação
      acc[key] = 0;
    }
    acc[key]++;
    return acc;
  }, []); { }
}