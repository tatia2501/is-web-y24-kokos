window.onload = loadBooks;
const dataContainer = document.getElementById("wishlist_list");
const template = document.getElementById("template");

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    addBook();
});

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.wishlist_check')) {
            bookPurchased(e.target.closest('.wishlist_check'));
        } else if (e.target.closest('.wishlist_checked')) {
            bookPurchased(e.target.closest('.wishlist_checked'));
        }
        if (e.target.closest('.delete_book')) {
            removeBook(e.target.closest('.delete_book'));
        }
    });
});

function showBook(list, book, title) {
    const item = template.content.cloneNode(true);
    let input = item.querySelectorAll("input");
    input[0].className = book.purchased ? 'wishlist_checked' : 'wishlist_check';
    let div = item.querySelectorAll("div");
    div[0].className = book.purchased ? 'purchased' : 'wishlist_book';
    div[0].textContent = title;
    dataContainer.appendChild(item);
}

function loadBooks() {
    if (localStorage.getItem("books") == null) return;
    let books = Array.from(JSON.parse(localStorage.getItem("books")));

    let list = document.querySelector("ul");
    books.forEach(book => {
        let title = book.book;
        showBook(list, book, title)
    });
}

function addBook() {
    let book = document.querySelector("form input");
    book.value = book.value.trim();
    let list = document.querySelector("ul");

    let books = Array.from(JSON.parse(localStorage.getItem("books")));

    let isBookInList = false;
    books.forEach(cur_book => {
        if (cur_book.book === book.value) {
            alert("Книга уже есть в списке");
            isBookInList = true;
        }
    });

    if (isBookInList) {
        return false;
    }

    if (book.value === "") {
        alert("Напишите название книги");
        return false;
    }

    localStorage.setItem("books", JSON.stringify([...JSON.parse(localStorage.getItem("books") || "[]"), { book: book.value, purchased: false }]));

    let title = book.value;
    showBook(list, book, title)

    book.value = "";
}

function bookPurchased(event) {
    let books = Array.from(JSON.parse(localStorage.getItem("books")));
    let isPurchased = true;
    books.forEach(book => {
        if (book.book === event.parentNode.children[1].textContent) {
            book.purchased = !book.purchased;
            isPurchased = book.purchased;
        }
    });
    localStorage.setItem("books", JSON.stringify(books));
    event.nextElementSibling.className = isPurchased ? 'purchased' : 'wishlist_book';
    event.className = isPurchased ? 'wishlist_checked' : 'wishlist_check';
}

function removeBook(event) {
    let books = Array.from(JSON.parse(localStorage.getItem("books")));
    books.forEach(book => {
        if (book.book === event.parentNode.children[1].textContent) {
            books.splice(books.indexOf(book), 1);
        }
    });
    localStorage.setItem("books", JSON.stringify(books));
    event.parentElement.remove();
}