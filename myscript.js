const myLibrary = []

function Book(name,author,pages,status){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addToLibrary(book){
    myLibrary.push(book);
}

Book.prototype.toggleStatus = function(){
    
    this.status = !this.status;
   ;
}

function removeBook(index){
    myLibrary.splice(index,1);
}

const book1 = new Book("The Alchemist", "Paulo Coelho", 342,true);
const book2 = new Book("Emotional Intelligence","Daniel Goleman",370,true);
const book3 = new Book("Think and Grow Rich","Napoleon Hill",238, false);
const book4 = new Book("Rich Dad Poor Dad","Robert Kiyosaki",376,true);

addToLibrary(book1);
addToLibrary(book2);
addToLibrary(book3);
addToLibrary(book4);



const bookList = document.getElementById("content");

function displayBooks() {
    const bookList = document.getElementById("content");
    bookList.innerHTML = ''; 

    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <h2>${book.name}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read?:</strong> ${book.status ? 'Yes' : 'No'}</p>
            <div class=btn-container>
            <button class="toggle-status" data-index="${index}">Toggle Status</button>
            <button class="remove-book" data-index="${index}">Remove</button>
            </div>
            
        `;
        bookList.appendChild(bookDiv);
    });

    // Add event listeners for remove and toggle buttons
    const removeButtons = document.querySelectorAll('.remove-book');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            const index = this.getAttribute('data-index');
            removeBook(index);
            displayBooks(); // Refresh the display after removal
        });
    });

    const toggleButtons = document.querySelectorAll('.toggle-status');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            const index = this.getAttribute('data-index');
            myLibrary[index].toggleStatus(); // Toggle the status of the book
            
            displayBooks(); // Refresh the display after toggling status
        });
    });
}


displayBooks();

  const modal = document.getElementById("modal");
  const btn = document.getElementById("add-book");
  const span = document.getElementsByClassName("close")[0];
  const form = document.getElementById("book-form");
  
  btn.onclick = function() {
      modal.style.display = "block";
  }
  
  span.onclick = function() {
      modal.style.display = "none";
  }
  
  window.onclick = function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  }
  
  form.onsubmit = function(event) {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const author = document.getElementById("author").value;
      const pages = document.getElementById("pages").value;
      const status = document.getElementById("status").value === "true";
      
      const newBook = new Book(name, author, pages, status);
      addToLibrary(newBook);
      
      displayBooks()
      
      modal.style.display = "none";
      form.reset();
  }