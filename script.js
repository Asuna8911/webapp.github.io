const ul = document.getElementById("anime-list");
const searchInput = document.getElementById("search");
const paginationDiv = document.getElementById("pagination");

let animeList = [];
let currentPage = 1;
const itemsPerPage = 5;

// JSON laden
fetch("anime.json")
  .then(res => res.json())
  .then(data => {
    animeList = data;
    displayList();
    setupPagination();
  })
  .catch(err => console.error(err));

// Liste anzeigen
function displayList() {
  ul.innerHTML = "";
  const filtered = animeList.filter(anime =>
    anime.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filtered.slice(start, end);

  pageItems.forEach(anime => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = anime.image;
    img.alt = anime.title;

    const link = document.createElement("a");
    link.href = anime.url;
    link.target = "_blank";
    link.textContent = anime.title;

    li.appendChild(img);
    li.appendChild(link);
    ul.appendChild(li);
  });

  setupPagination();
}

// Pagination Buttons
function setupPagination() {
  paginationDiv.innerHTML = "";
  const filtered = animeList.filter(anime =>
    anime.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  const pageCount = Math.ceil(filtered.length / itemsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("span");
    btn.textContent = i;
    btn.classList.add("page-btn");
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      displayList();
    });
    paginationDiv.appendChild(btn);
  }
}

// Suche filtern
searchInput.addEventListener("input", () => {
  currentPage = 1;
  displayList();
});
