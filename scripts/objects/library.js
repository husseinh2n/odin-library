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
        const emptyLibraryText = document.querySelector('#emptyLibraryText');
        
        // Check if the library is empty
         // Check if the library is empty
    if (this.books.length <= 0) {
        emptyLibraryText.style.display = 'block'; // Show the "empty library" text
    } else {
        emptyLibraryText.style.display = 'none';  // Hide the "empty library" text
    }
    
        // Let each book create and display its card
        this.books.forEach(book => {
            book.displayBook(); // Call Book's display logic
        });
    }
    
    
    
}
