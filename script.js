const searchBtn = document.getElementById("search-button");
const input = document.getElementById("input");
searchBtn.addEventListener("click", () => {
  const searchTerm = input.value.trim();
  if (searchTerm !== "") {
    searchImages(searchTerm);
  }
  input.value = "";
});

searchImages = (query) => {
  const apiKey = "bnoQbRq2uxZPhx6IxaLs82nr1hweEUsaq0CLDZEyTjM";
  const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const images = data.results.filter(
        (result) => result.urls.regular && result.alt_description
      );
      filterImages(images, query);
    })
    .catch((error) => console.log(error));
};

filterImages = (images, searchTerm) => {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  let imageFound = false;
  images.forEach((image) => {
    const tags = image.alt_description.toLowerCase();
    if (tags.includes(searchTerm.toLowerCase())) {
      const img = document.createElement("img");
      img.classList.add("w-64", "h-64", "border-2", "border-gray-300");
      img.src = image.urls.regular;
      img.alt = image.alt_description;
      gallery.appendChild(img);
      imageFound = true;
    }
  });
  if (!imageFound) {
    gallery.innerHTML = "<p>La imagen no se encuentra en la galería.</p>";
  }
};
