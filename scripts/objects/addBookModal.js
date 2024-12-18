import Book from './book.js';

export default class AddBookModal {
    constructor(library) {
        this.library = library;
        this.modal = new bootstrap.Modal(document.querySelector('#addBookModal'));
    }

    // Retrieve input field nodes
    getInputFields() {
        return {
            title: document.querySelector('#inputBookTitle'),
            author: document.querySelector('#inputBookAuthor'),
            pages: document.querySelector('#inputBookPages'),
            readStatus: document.querySelector('#inputBookReadStatus'),
        };
    }

    // Reset all input fields in the modal
    resetForm() {
        const inputs = this.getInputFields();
        inputs.title.value = '';
        inputs.author.value = '';
        inputs.pages.value = '';
        inputs.readStatus.checked = false;
        Object.values(inputs).forEach(input => input.classList.remove('is-invalid'));
    }

    // Validate that required fields are filled
    isInputValid() {
        const { title, author, pages } = this.getInputFields();
        let isValid = true;

        [title, author, pages].forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        return isValid;
    }

    // Create a new Book instance using user input
    createBookFromInput() {
        const { title, author, pages, readStatus } = this.getInputFields();
        return new Book(
            null, // ISBN is optional for now
            title.value.trim(),
            author.value.trim(),
            pages.value.trim(),
            readStatus.checked
        );
    }

    // Set up the "Save" button logic
    setUpSaveButton() {
        const saveButton = document.querySelector('#addBookModalSaveButton');
    
        saveButton.addEventListener('click', (e) => {
            if (this.isInputValid()) {
                const newBook = this.createBookFromInput();
                this.library.addBook(newBook);
    
                // Remove focus from the Save button before hiding the modal
                saveButton.blur();
    
                // Hide the modal
                this.modal.hide();
    
                this.resetForm(); // Reset the form inputs
            }
        });
    }

    // Set up the "Cancel" button logic
    setUpCancelButton() {
        const cancelButton = document.querySelector('#addBookModalCancelButton');
        cancelButton.addEventListener('click', () => {
            this.resetForm();
        });
    }

    // Set up the "Add Book" card/button to open the modal
    setUpAddBookButton() {
        const addBookButton = document.querySelector('#addBookButton');
        addBookButton.addEventListener('click', () => {
            // Remove focus from the button before opening the modal
            addBookButton.blur(); // This removes focus from the button

            // Remove aria-hidden before opening the modal
            const modalElement = document.querySelector('#addBookModal');
            modalElement.removeAttribute('aria-hidden'); // Remove aria-hidden

            // Show the modal
            this.modal.show();

            // Focus on the first input field inside the modal
            const firstInput = document.querySelector('#inputBookTitle');
            firstInput.focus(); // Focus on the first input field inside the modal
        });
    }

    // Set up the entire modal functionality
    setUp() {
        const modalElement = document.querySelector('#addBookModal');
        
        // iOS detection
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS) {
            modalElement.classList.remove('fade');
        }
    
        this.modal = new bootstrap.Modal(modalElement);
        this.setUpSaveButton();
        this.setUpCancelButton();
        this.setUpAddBookButton();
    }
}
