let data;
async function populate(page, isArrivals) {
  if (!data) {
    const requestURL = "https://martabodnaruk.github.io/final.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    data = await response.json();
  }

  if (isArrivals) {
    populateNewArrivals(data, page);
  } else {
    populateBlog(data, page);
  }
}
function paginator(items, page, per_page) {
  var page = page || 1,
    per_page = per_page || 6,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page);
  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
}

function populateNewArrivals(catalog, page) {
  const allArrivalItemsInfo = catalog.arrivals;
  const arrivalItemsInfo = paginator(allArrivalItemsInfo, ++page, 6).data;
  const arrivalsContainer = document.querySelector(".new-items-container");

  for (const arrivalItemInfo of arrivalItemsInfo) {
    const arrivalItemCard = document.createElement("figure");
    arrivalItemCard.className = "arrival-item";
    arrivalsContainer.appendChild(arrivalItemCard);

    const arrivalItemImg = document.createElement("img");
    const arrivalItemName = document.createElement("figscaption");
    const arrivalItemPrice = document.createElement("figscaption");

    arrivalItemImg.src = arrivalItemInfo.image;
    arrivalItemName.textContent = arrivalItemInfo.title;
    arrivalItemPrice.textContent = `${arrivalItemInfo.price}`;

    arrivalItemName.className = "product-name";
    arrivalItemPrice.className = "product-price";
    arrivalItemImg.className = "arrival-item-img";

    arrivalItemCard.appendChild(arrivalItemImg);

    arrivalItemCard.appendChild(arrivalItemName);
    arrivalItemCard.appendChild(arrivalItemPrice);

    const arrivalLike = document.createElement("div");
    const arrivalItemLike = document.createElement("i");

    arrivalLike.className = "like";

    arrivalLike.appendChild(arrivalItemLike);
    arrivalItemCard.appendChild(arrivalLike);

    if (arrivalItemInfo.like === false) {
      arrivalItemLike.className = "fa-regular fa-heart";
    } else {
      arrivalItemLike.className = "fa fa-heart liked";
    }

    const rating = arrivalItemInfo.rating;
    const arrivalRating = document.createElement("div");
    arrivalRating.className = "rating";

    for (const rate of rating) {
      const arrivalItemRate = document.createElement("i");
      arrivalRating.appendChild(arrivalItemRate);
      arrivalItemCard.appendChild(arrivalRating);

      if (rate === false) {
        arrivalItemRate.className = "fa-regular fa-star";
      } else {
        arrivalItemRate.className = "fa fa-star checked";
      }
    }
  }
}

function populateBlog(catalog, page) {
  const blogInfo = catalog.fashionBlog;
  const blogItemsInfo = paginator(blogInfo, ++page, 2).data;
  const blogCards = document.querySelector(".blog-cards");

  for (const blogItemInfo of blogItemsInfo) {
    const blogCardItem = document.createElement("div");
    blogCardItem.className = "blog-card-item";
    blogCards.appendChild(blogCardItem);

    const blogCardImage = document.createElement("img");
    const blogCardContent = document.createElement("div");

    blogCardImage.className = "blog-img";
    blogCardContent.className = "blog-content";

    blogCardImage.src = blogItemInfo.blogImage;

    blogCardItem.appendChild(blogCardImage);
    blogCardItem.appendChild(blogCardContent);

    const blogTitleWrapp = document.createElement("a");
    const blogInfoBlock = document.createElement("div");
    const blogText = document.createElement("div");

    blogInfoBlock.className = "blog-info-block flex";
    blogText.className = "blog-text";

    blogText.textContent = blogItemInfo.blogText;

    blogCardContent.appendChild(blogTitleWrapp);
    blogCardContent.appendChild(blogInfoBlock);
    blogCardContent.appendChild(blogText);

    const blogTitle = document.createElement("div");
    blogTitle.className = "blog-title";
    blogTitle.textContent = blogItemInfo.blogTitle;
    blogTitleWrapp.append(blogTitle);

    const blogCategory = document.createElement("div");
    const blogDivider = document.createElement("div");
const blogSecondDivider = document.createElement("div");
    const blogDate = document.createElement("div");
    const blogComments = document.createElement("div");
    const blogCommentsIcon = document.createElement("i");
    const blogCommentsAmount = document.createElement("span");

    blogCategory.className = "blog-category";
    blogDivider.className = "blog-divider";
blogSecondDivider.className = "blog-divider";
    blogDate.className = "blog-date";
    blogComments.className = "blog-comments";
    blogCommentsAmount.className = "comments-amount";
    blogCommentsIcon.className = "fa fa-comments";

    blogCategory.textContent = blogItemInfo.category;
    blogDate.textContent = blogItemInfo.date;

    blogCommentsAmount.textContent = blogItemInfo.comments.length
      ? `${blogItemInfo.comments.length} comments`
      : "No comments";

    blogInfoBlock.appendChild(blogCategory);
    blogInfoBlock.appendChild(blogDivider);
    blogInfoBlock.appendChild(blogDate);
    blogInfoBlock.appendChild(blogSecondDivider);
    blogComments.appendChild(blogCommentsIcon);
    blogComments.appendChild(blogCommentsAmount);
    blogInfoBlock.appendChild(blogComments);
  }
}
populate(0, true);

populate(0, false);

const pagerItems = document.querySelectorAll(".arrivals-pager-item-wrap");
console.log(pagerItems);
for (let i = 0; i < pagerItems.length; i++) {
  pagerItems[i].onclick = () => {
    document.querySelector(".new-items-container").innerHTML = "";

    populate(i, true);
  };
}

let blogCardIndex = 0;
const blogPreviousButtonD = document.querySelector(
  ".blog-previous-button.desktop"
);
const blogNextButtonD = document.querySelector(".blog-next-button.desktop");
const blogPreviousButtonM = document.querySelector(".blog-previous-button.mob");
const blogNextButtonM = document.querySelector(".blog-next-button.mob");

blogPreviousButtonM.onclick = function showPreviousBlogPosts() {
  if (blogCardIndex <= 0) {
    return;
  }
  document.querySelector(".blog-cards").innerHTML = "";
  blogCardIndex = blogCardIndex - 1;
  populate(blogCardIndex, false);
};
blogNextButtonM.onclick = function showNextBlogPosts() {
  if (blogCardIndex >= (data.fashionBlog.length - 2) / 2) {
    return;
  }
  document.querySelector(".blog-cards").innerHTML = "";
  blogCardIndex = blogCardIndex + 1;
  populate(blogCardIndex, false);
};
blogPreviousButtonD.onclick = function showPreviousBlogPosts() {
  if (blogCardIndex <= 0) {
    return;
  }
  document.querySelector(".blog-cards").innerHTML = "";
  blogCardIndex = blogCardIndex - 1;
  populate(blogCardIndex, false);
};
blogNextButtonD.onclick = function showNextBlogPosts() {
  if (blogCardIndex >= (data.fashionBlog.length - 2) / 2) {
    return;
  }
  document.querySelector(".blog-cards").innerHTML = "";
  blogCardIndex = blogCardIndex + 1;
  populate(blogCardIndex, false);
};
// Set the date we're counting down to
var countDownDate = new Date("Jan 17, 2023 06:04:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("timer-days").innerText = days;
  document.getElementById("timer-hours").innerText = hours;
  document.getElementById("timer-sec").innerText = seconds;
  document.getElementById("timer-min").innerText = minutes;
  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
