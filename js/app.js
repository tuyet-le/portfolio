/* Create a typewriter */
class Typewriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.txt = '';
        this.wordIndex = 0;
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove a character
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add a character
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert text into element
        this.txtElement.innerHTML = `<span class="cursor">${this.txt}</span>`;

        // Initial type speed
        let typeSpeed = 100;

        // Increase the speed of deleting by half
        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If the word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Add a pause at the end of the full text
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to the next word
            this.wordIndex++;
            // Pause before next word type
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init on DOM load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.typewriter');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init typewriter
    new Typewriter(txtElement, words, wait)
}