const container = document.getElementById('book_info');
const template_book = document.getElementById('book_temp');

const getBooks = async () => {
  return await fetch(`/wishlist/show`).then((response) => response.json());
};

const deleteFromFavourites = async (book_id) => {
  return await fetch(`/wishlist/${book_id}`, { method: 'DELETE' });
};

const addToBasket = async (book_id) => {
  return await fetch(`/basket/${book_id}`, { method: 'POST' });
};

async function getAllBooks() {
  const data = (await getBooks()).slice();
  container.innerHTML = '';
  for (const item of data) {
    const book = template_book.content.cloneNode(true);
    let pic = book.getElementById('imgBx');
    pic.src = item.picture;
    let h1 = book.querySelectorAll('h1');
    h1[0].textContent = item.name;
    let h2 = book.querySelectorAll('h2');
    h2[0].textContent = item.author;
    let h3 = book.querySelectorAll('h3');
    h3[0].textContent = item.price + ' руб';
    let delete_btn = book.getElementById('delete_btn');
    delete_btn.addEventListener('click', async () => {
      await deleteFromFavourites(item.id);
      window.location.reload();
    });
    let basket_btn = book.getElementById('basket_btn');
    basket_btn.addEventListener('click', async () => {
      await addToBasket(item.id);
    });
    container.appendChild(book);
  }
}

getAllBooks();
