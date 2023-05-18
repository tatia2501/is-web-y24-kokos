const container = document.getElementById('book_info');
const template_book = document.getElementById('book_temp');

const getBooks = async () => {
  return await fetch(`/basket/show`).then((response) => response.json());
};

const deleteFromBasket = async (book_id) => {
  return await fetch(`/basket/${book_id}`, { method: 'DELETE' });
};

const changeAmount = async (book_id, amount) => {
  return await fetch(`/basket/${book_id}?amount=${amount}`, { method: 'PUT' });
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
    h3[1].textContent = 'кол-во: ' + item.amount;
    let delete_btn = book.getElementById('delete_btn');
    delete_btn.addEventListener('click', async () => {
      await deleteFromBasket(item.id);
      window.location.reload();
    });
    let amount_less = book.getElementById('amount_less');
    amount_less.addEventListener('click', async () => {
      if (item.amount > 1) await changeAmount(item.id, item.amount - 1);
      else await deleteFromBasket(item.id);
      window.location.reload();
    });
    let amount_more = book.getElementById('amount_more');
    amount_more.addEventListener('click', async () => {
      await changeAmount(item.id, item.amount + 1);
      window.location.reload();
    });
    container.appendChild(book);
  }
}

getAllBooks();
