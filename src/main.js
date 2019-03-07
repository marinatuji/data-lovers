// const steam = require('./src/data/steam/steam.json');
window.onload = function() {
  showNews();
  alert('carregou');
}; //checar a sintaxe

//importar os dados do steam.js
function getData() {
  return STEAM['appnews']['newsitems'];
}
//rever trazer os dados

function showNews() {
  console.log('DEU CERTO', getData());
}

function filterNews() {
 
}

function orderByDate() {
}