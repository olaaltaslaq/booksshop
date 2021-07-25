'use strict';

books.prototype.allbooks=[];

function books(name, price){
  this.bName= name;
  this.price=price;
  this.pages=this.randomPages();
  books.prototype.allbooks.push(this);
}

var total=0;

books.prototype.randomPages= function(){
  return this.pages= Math.floor(Math.random() * (500 - 1) +1);
}

var table = document.getElementById('table');

function renderHeader(){
  var headerRow = document.createElement('tr');
  table.appendChild(headerRow);

  var namebook = document.createElement('th');
  namebook.textContent=' Book Name';
  headerRow.appendChild(namebook);

  var pagesbook = document.createElement('th');
  pagesbook.textContent=' Book pages';
  headerRow.appendChild(pagesbook);

  var priceBook = document.createElement('th');
  priceBook.textContent=' Book Price';
  headerRow.appendChild(priceBook);

}

renderHeader();

books.prototype.render = function(){
  var bookRow = document.createElement('tr');
  table.appendChild(bookRow);

  var bookName = document.createElement('td');
  bookName.textContent=this.bName;
  bookRow.appendChild(bookName);

  var bookPrice = document.createElement('td');
  bookPrice.textContent=this.price;
  bookRow.appendChild(bookPrice);

  var bookPages = document.createElement('td');
  bookPages.textContent=this.pages;
  total=total+this.pages;
  bookRow.appendChild(bookPages);

}

var booksLS =localStorage.getItem('books');

if (booksLS){
  booksLS= JSON.parse(booksLS);
  table.innerHTML='';
  renderHeader();

  for (var i=0; i<booksLS.length; i++){
    const IsDon = new books (booksLS[i].bName, booksLS[i].price);
    IsDon.pages=booksLS[i].pages;
    IsDon.render();
  }
}

var form = document.getElementById('form');
form.addEventListener('submit', addBook);

function addBook(event) {
  event.preventDefault();

  var boName = event.target.name.value;
  var boPrice = event.target.price.value;

  var newbook = new books (boName, boPrice);
  newbook.render();
  form.reset();

  var don = JSON.stringify(books.prototype.allbooks);
  localStorage.setItem('books' ,don);
}
