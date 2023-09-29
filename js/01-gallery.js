import { galleryItems } from "./gallery-items.js";
// Change code below this line

const list = document.querySelector(".gallery");

const gallery = galleryItems
  .map(
    (item) => `
        <li class="gallery__item">
            <a class="gallery__link" href="${item.original}">
                <img
                class="gallery__image"
                src="${item.preview}"
                data-source="${item.original}"
                alt="${item.description}"
                />
            </a>
        </li>`
  )
  .join("");

list.insertAdjacentHTML("afterbegin", gallery);

const getLargeImg = (e) => {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `
    <img src="${e.target.dataset.source}" alt="${e.target.alt}" height="570">`,
    {
      onShow: () =>
        window.addEventListener("keydown", (e) => closeWindow(e, instance)),
      onClose: () => window.removeEventListener("keydown", closeWindow),
    }
  );

  instance.show();
};

list.addEventListener("click", getLargeImg);

const closeWindow = (e, curInstance) => {
  if (e.code === "Escape") {
    curInstance.close();
  }
};
