/**
 *  INSERT YOUR API KEY BELOW https://pixabay.com/
 * */
const PIXABAY_API_KEY = "";

const searchInput = document.getElementById("searchInput");
const imageWrapper = document.getElementById("imageWrapper");

const url = (API_KEY, QUERRY) => {
  return `https://pixabay.com/api/?key=${API_KEY}&q=${QUERRY}&image_type=photo&pretty=true`;
};

window.addEventListener("DOMContentLoaded", () => {
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("fetchButton").click();
    }
  });
});

const fetchImages = async () => {
  const querry = document.getElementById("searchInput").value;
  if (querry.length == 0) return;
  imageWrapper.innerHTML = "";

  const res = await fetch(url(PIXABAY_API_KEY, querry));
  const parsed = await res.json();
  const images = parsed.hits;

  images.forEach((e) => {
    const a = document.createElement("a");
    const { previewURL, largeImageURL } = e;
    a.setAttribute("data-fancybox", "gallery");
    a.setAttribute("data-src", largeImageURL);
    a.classList.add("w-[200px]");
    a.innerHTML = `
        <img src="${previewURL}" width="200" height="200" class="border border-gray-200 rounded-md object-cover" style="aspect-ratio: 200 / 200; object-fit: cover" />
    `;

    imageWrapper.appendChild(a);
  });
};
