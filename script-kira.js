//=== Left-side-nav-bar display

const navBarBtn = document.querySelector('[data-navBar-btn]');
const navBarSmBtn = document.querySelector('[data-sm-navBar-btn]');
const navItems = document.querySelector('[data-nav-items]'); //Navlinks
const navSmItems = document.querySelector('[data-nav-sm-items]');
navBarBtn.addEventListener('click', function (e) {
    const elClsList = e.target.classList;
    if (elClsList.contains('fa-bars')) {
        elClsList.remove('fa-bars');
        elClsList.add('fa-xmark');
    } else {
        elClsList.remove('fa-xmark');
        elClsList.add('fa-bars');
    } // Toggle icons

    navItems.classList.toggle('navItems-toggler'); // Toggle Nav Links
});

navBarSmBtn.addEventListener('click', function (e) {
    const elClsList = e.target.classList;

    navSmItems.classList.toggle('nav-sm-bar-toggler');
});

//=== Profile Modal

const profile = document.querySelector('[data-profile]');
const profileModalEl = document.querySelector('[data-profile-modal]');
const profileModelCloseBtn = document.querySelector('[data-modal-close-btn]');
profile.addEventListener('click', function () {
    profileModalEl.showModal();
});
profileModelCloseBtn.addEventListener('click', function () {
    profileModalEl.close();
});

// === Product Details (Adding imgs,brand names,products names and product to productDetails object)

const imgs = document.querySelectorAll('[data-image]');
const brandNames = document.querySelectorAll('[data-brand]');
const productNames = document.querySelectorAll('[data-product-name]');
const prices = document.querySelectorAll('[data-price]');

let productDetails = {
    imgs: [],
    brands: [],
    products: [],
    prices: [],
};

for (let i = 0; i < brandNames.length; i++) {
    productDetails.imgs.push(imgs[i].src);
    productDetails.brands.push(brandNames[i].textContent);
    productDetails.products.push(productNames[i].textContent);
    productDetails.prices.push(prices[i].textContent);
}

//=== Search

const search = document.querySelector('[data-search]'); // search-icon
const searchBox = document.querySelector('[data-searchBox-container]'); //search-input-container(div)
const searchInput = document.querySelector('[data-searchinput]'); //search-inputbox
const searchListEl = document.querySelector('[data-search-list]'); //searchList(ul)
const toolTips = document.querySelectorAll('[data-toolTip]'); //tooltips

search.addEventListener('click', function () {
    toolTips.forEach((toolTip) => toolTip.classList.toggle('tool-tip-toggler'));
    searchBox.classList.toggle('search-toggler');
}); // Removing Tooltips and show searchBox

const count = productDetails.brands.length;

for (let i = 0; i < count; i++) {
    const img = productDetails.imgs[i];
    const brand = productDetails.brands[i];
    const product = productDetails.products[i];

    searchListEl.innerHTML += `<a href="#" class="search-item" data-list>
                        <div class="cols">
                            <div class="col">
                                <img src="${img}" / >
                            </div>
                            <div class="col">
                                <span class="brand-name" data-brand
                                    >${brand}</span
                                >
                                <h3 class="product-name" data-product-name>
                                   ${product}
                                </h3>
                            </div>
                        </div>
                    </a>`;
} //Adding itemList Dynamically

const itemLists = document.querySelectorAll('[data-list]'); //List

searchInput.addEventListener('keyup', function (event) {
    searchProduct(event);
}); // Search Items

function removeWhiteSpace(str) {
    return str.split(' ').join('');
} //Removing WhiteSpace

function searchProduct(event) {
    const searchValue = event.target.value.toLowerCase();

    for (let i = 0; i < count; i++) {
        const brand = removeWhiteSpace(productDetails.brands[i]).toLowerCase();
        const product = removeWhiteSpace(
            productDetails.products[i]
        ).toLowerCase();
        const isFound =
            brand.includes(searchValue) || product.includes(searchValue);

        if (isFound) {
            itemLists[i].style.display = 'block';
        } else {
            itemLists[i].style.display = 'none';
        }

        if (searchValue === '') {
            itemLists[i].style.display = 'none';
        }
    }
}

// === Wishlist
const wishList = document.querySelector('[data-wishlist]');
const wishListBox = document.querySelector('[data-wishlist-container]');
const wishListContainerEl = document.querySelector(
    '[data-wishlist-sub-container]'
);
const wishListBoxCloseBtn = document.querySelector(
    '[data-wislist-container-close-btn]'
);

wishList.addEventListener('click', () => {
    wishListBox.classList.toggle('wishlist-toggler');
});

wishListBoxCloseBtn.addEventListener('click', () => {
    wishListBox.classList.toggle('wishlist-toggler');
});

const cartBtns = document.querySelectorAll('[data-cart]');
const emptyCartText = document.querySelector('[data-empty-cart]');

cartBtns.forEach(function (btn, i) {
    btn.addEventListener('click', function (e) {
        const img = productDetails.imgs[i];
        const brand = productDetails.brands[i];
        const product = productDetails.products[i];
        const price = productDetails.prices[i];

        if (wishListContainerEl.firstElementChild === emptyCartText) {
            wishListContainerEl.removeChild(emptyCartText);
            wishListContainerEl.innerHTML = `<ul class="wishlist-header cols" data-wishlist-header>
                        <div class="col">
                            <h3>Image</h3>
                        </div>
                        <div class="col">
                            <h3>Brand</h3>
                        </div>
                        <div class="col">
                            <h3>Name</h3>
                        </div>
                        <div class="col">
                            <h3>Price</h3>
                        </div>
                    </ul>`;
        }
        wishListContainerEl.innerHTML += `<ul class="cols wishlist-item-list">
                        <div class="col">
                            <img src="${img}"" />
                        </div>
                        <div class="col">
                            <p>${brand}</p>
                        </div>
                        <div class="col">
                            <p>${product}</p>
                        </div>
                        <div class="col price-col">
                            <p>${price}</p>

                            <i class="fa-solid fa-xmark remove-btn"></i>
                        </div>
                    </ul>`; //adding items into wishlistcontainer

        const wishListItemDelBtns = document.querySelectorAll('.remove-btn');
        const wishListItems = document.querySelectorAll('.wishlist-item-list');

        wishListItemDelBtns.forEach(function (btn, i) {
            btn.addEventListener('click', function (e) {
                wishListContainerEl.removeChild(wishListItems[i]);
            });
        }); //delete item using red cross btn
    });
});

//=== About Carousel ===//
const carouselItems = document.querySelectorAll('[data-carousel-item]');
const carouselNav = document.querySelector('[data-carousel-nav]');

// === Create CarouselNavBtns Dynamically

let aboutCarNavItems = [];

for (let i = 0; i < carouselItems.length; i++) {
    const newSpanEl = document.createElement('span');
    newSpanEl.setAttribute('date-carousel-nav-item', '');
    newSpanEl.classList.add('carousel-nav-item');

    aboutCarNavItems.push(newSpanEl);
}

aboutCarNavItems[0].classList.add('selected');

for (let i = 0; i < aboutCarNavItems.length; i++) {
    carouselNav.appendChild(aboutCarNavItems[i]);
}

// ===== Carousel Functions

let index = 0;

document
    .querySelector('[data-carousel-prev]')
    .addEventListener('click', moveToPrev);

document
    .querySelector('[data-carousel-next]')
    .addEventListener('click', moveToNext);

aboutCarNavItems.forEach(function (item, i) {
    item.addEventListener('click', function () {
        removeOriginCls();
        index = i;
        addNewCls();
    });
});

// =====

// === Use to remove all original classes

function removeOriginCls() {
    carouselItems.forEach(function (item) {
        item.classList.remove('visible');
    });
    aboutCarNavItems.forEach(function (item) {
        item.classList.remove('selected');
    });
}

// === Add classes to elements with specific Index No

function addNewCls() {
    aboutCarNavItems[index].classList.add('selected');
    carouselItems[index].classList.add('visible');
}

// === Move to previous img

function moveToPrev() {
    removeOriginCls();

    if (index === 0) {
        index = carouselItems.length - 1;
    } else {
        index--;
    }
    addNewCls(index);
}
// === Move to next img

function moveToNext() {
    removeOriginCls();

    if (index === carouselItems.length - 1) {
        index = 0;
    } else {
        index++;
    }
    addNewCls(index);
}

// === Display Floating Form and Toggle fontawesome elements

const floatingForm = document.querySelector('[data-floating-form]');
const messageIconEl = document.querySelector('[data-floating-message]');
const messageIconClass = messageIconEl.classList;
function displayFloatingForm() {
    floatingForm.classList.toggle('floating-form-toggler');
    if (messageIconClass.contains('fa-message')) {
        messageIconClass.remove('fa-message');
        messageIconClass.add('fa-xmark');
    } else {
        messageIconClass.remove('fa-xmark');
        messageIconClass.add('fa-message');
    }
}
