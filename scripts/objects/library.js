import Book from './book.js';

export default class Library {
    constructor() {
        this.books = []; // Holds all Book instances
    }

    // Add a new book to the library
    addBook(book) {
        book.id = book.generateUniqueId(); // Ensure unique ID
        book.library = this;
        this.books.push(book);
        this.refreshDisplay();
    }

    // Remove a book from the library
    removeBook(bookToRemove) {
        this.books = this.books.filter(book => book.id !== bookToRemove.id);
        this.refreshDisplay();
    }

    // Refresh the display: Clear container and re-render all books
    refreshDisplay() {
        const libraryContainer = document.getElementById('libraryCards');
        const emptyLibraryText = document.getElementById('emptyLibraryText');
    
        // Clear existing book cards only
        while (libraryContainer.firstChild) {
            libraryContainer.removeChild(libraryContainer.firstChild);
        }
    
        // Show or hide the "Your library is empty" text
        if (this.books.length === 0) {
            emptyLibraryText.style.display = 'block';
        } else {
            emptyLibraryText.style.display = 'none';
            // Add all books back to the DOM
            this.books.forEach(book => {
                libraryContainer.appendChild(book.createBookCard());
            });
        }
    }
    
    
    
}
