const postsSection = document.getElementById('book_info');
const template_book = document.getElementById('book_temp');
const numberPerPage = 5;
let pageNumber = 1;
const numberOfPages = 3;

const addToBasket = async (book_id) => {
  return await fetch(`/basket/${book_id}`, { method: 'POST' });
};

const addToWishlist = async (book_id) => {
  return await fetch(`/wishlist/${book_id}`, { method: 'POST' });
};

const getAllBooks = async (pageNumber) => {
  const response = await fetch(
    `/book?page=${pageNumber}&numberPerPage=${numberPerPage}`,
  );
  const data = await response.json();
  postsSection.innerHTML = '';
  data.forEach((item) => {
    const book = template_book.content.cloneNode(true);
    let pic = book.getElementById('imgBx');
    pic.src = item.picture;
    let h1 = book.querySelectorAll('h1');
    h1[0].textContent = item.name;
    let h2 = book.querySelectorAll('h2');
    h2[0].textContent = item.author;
    let h3 = book.querySelectorAll('h3');
    h3[0].textContent = item.price + ' руб';
    let favourites_btn = book.getElementById('favourites_btn');
    favourites_btn.addEventListener('click', async () => {
      await addToWishlist(item.id);
    });
    let basket_btn = book.getElementById('basket_btn');
    basket_btn.addEventListener('click', async () => {
      await addToBasket(item.id);
    });
    postsSection.appendChild(book);
  });
};

const prev = document.querySelector('.prev');
prev.addEventListener('click', (e) => {
  e.preventDefault();
  if (pageNumber > 1) {
    pageNumber--;
    getAllBooks(pageNumber);
  }
});

const next = document.querySelector('.next');
next.addEventListener('click', (e) => {
  e.preventDefault();
  if (pageNumber < numberOfPages) {
    pageNumber++;
    getAllBooks(pageNumber);
  }
});

getAllBooks(pageNumber);
