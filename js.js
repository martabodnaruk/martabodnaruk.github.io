async function populate() {
  const requestURL = "https://martabodnaruk.github.io/catalog.json";
  const request = new Request(requestURL);

  const response = await fetch(request);
  const catalog = await response.json();

  populateH1(catalog);
  populateItemCards(catalog);
}

function populateH1(obj) {
  const myH1 = document.createElement("h1");
  const myPageWrapp = document.querySelector(".page-wrapp");
  myH1.textContent = obj.title;

  myPageWrapp.prepend(myH1);
}

function populateItemCards(obj) {
  const itemsInfo = obj.products;
  const container = document.querySelector(".container");

  for (const itemInfo of itemsInfo) {
    const itemCards = document.createElement("div");
    itemCards.className = "item-card";
    container.appendChild(itemCards);

    const category = document.createElement("div");
    const itemImg = document.createElement("img");
    const itemName = document.createElement("div");

    category.textContent = itemInfo.category;
    itemImg.src = itemInfo.image;
    itemName.textContent = itemInfo.title;

    category.className = "categories";
    itemImg.className = "item-img";
    itemName.className = "item-name";

    itemCards.appendChild(category);
    itemCards.appendChild(itemImg);
    itemCards.appendChild(itemName);

    if (itemInfo.badgeNew === true) {
      const badgeNew = document.createElement("div");
      badgeNew.className = "advertisement new";
      badgeNew.textContent = `Новинка`;
      itemCards.appendChild(badgeNew);
    }
    if (itemInfo.badgeHit === true) {
      const badgeHit = document.createElement("div");
      badgeHit.className = "advertisement hit";
      badgeHit.textContent = `Хіт`;
      itemCards.appendChild(badgeHit);
    }

    const itemPrice = document.createElement("div");
    const itemOldPrice = document.createElement("span");
    const itemActualPrice = document.createElement("span");

    itemOldPrice.textContent = `${itemInfo.oldPrice} грн`;
    itemActualPrice.textContent = `${itemInfo.price} грн`;

    itemPrice.className = "item-price";
    itemOldPrice.className = "old-price";
    itemActualPrice.className = "actual-price";

    if (itemInfo.sale === true) {
      itemPrice.appendChild(itemOldPrice);
      itemPrice.appendChild(itemActualPrice);
      itemCards.appendChild(itemPrice);
    } else {
      itemPrice.appendChild(itemActualPrice);
      itemCards.appendChild(itemPrice);
    }

    const availability = document.createElement("div");
    if (itemInfo.availability === true) {
      availability.className = "button";
      availability.textContent = `У корзину`;
      itemCards.appendChild(availability);
    } else {
      availability.className = "button availability";
      availability.textContent = `Незабаром у продажу`;
      itemCards.appendChild(availability);
      itemActualPrice.remove();
    }
  }
}

populate();
