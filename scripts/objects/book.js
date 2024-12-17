export default class Book {
    constructor(isbn, title, author, pages, readStatus = false) {
        this.isbn = isbn || null;  // ISBN is optional
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }

    // Generate a unique ID for each book
    generateUniqueId() {
        return `book-${Date.now()}-${Math.random().toString(36)}`;
    }

    createBookCard() {
        const bookCardTemplate = document.querySelector('#bookCard');
        const newBookCard = document.importNode(bookCardTemplate.content, true);
    
        // Populate the card with the book's data
        newBookCard.querySelector('#bookTitle').textContent = this.title;
        newBookCard.querySelector('#bookAuthor').textContent = `by ${this.author}`;
        newBookCard.querySelector('#bookPages').textContent = `${this.pages} pages`;

        // Save the card to this.card for later reference
        this.card = newBookCard.querySelector('.card');
    
        // Make buttons
        const readButton = this.createReadStatusButton(); 
        const deleteButton = this.createDeleteButton(); 
    
        // Add buttons to the card body
        const cardBody = newBookCard.querySelector('.card-body');
        cardBody.appendChild(readButton);
        cardBody.appendChild(deleteButton);
    
        return newBookCard; // Return the populated card
    }

    createReadStatusButton() {
        const readButton = document.createElement('button');
        readButton.classList.add('btn', this.readStatus ? 'btn-success' : 'btn-secondary');
        readButton.textContent = this.readStatus ? 'Read' : 'Unread';
        readButton.addEventListener('click', () => {
            this.toggleReadStatus();
            readButton.classList.toggle('btn-success');
            readButton.classList.toggle('btn-secondary');
            readButton.textContent = this.readStatus ? 'Read' : 'Unread';
        });
        return readButton;
    }
    
    createDeleteButton() {
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'me-2');
        deleteButton.textContent = 'Delete';
    
        // Call removeBook on the Library to remove the book and refresh the display
        deleteButton.addEventListener('click', () => {
            this.library.removeBook(this); // Remove the book from the library collection
            this.card.remove(); // Remove the card from the DOM
            this.library.refreshDisplay(); // Refresh the display to check if the library is empty
        });
    
        return deleteButton;
    }
    
    
           
    
    
    toggleReadStatus() {
        this.readStatus = !this.readStatus;
    }

    // Method to get a string representation of the book
    getBookInfo() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus ? 'Read' : 'Not Read'}`;
    }

    
    displayBook() {
        const libraryCardsContainer = document.getElementById('libraryCards');
        const emptyLibraryText = document.getElementById('emptyLibraryText');
    
        // Hide empty library text if there are books
        if (libraryCardsContainer.children.length === 0) {
            emptyLibraryText.style.display = 'none';
        }
    
        // Append the populated book card to the library container
        const bookCard = this.createBookCard(); // Get the populated card
        libraryCardsContainer.appendChild(bookCard);
    }

}
