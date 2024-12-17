import Library from './objects/library.js';
import AddBookModal from './objects/addBookModal.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Library
    const library = new Library();

    // Initialize AddBookModal
    const addBookModal = new AddBookModal(library);
    
    // Set up the modal and other UI interactions
    addBookModal.setUp();

    // Initially display books in the library (if any)
    library.refreshDisplay();
});
