/**
  * Navigation is built dynamically as an unordered list
 **/

/* --- Define Global Variables --- */
const navList = document.getElementById('nav__list');
const sections = document.querySelectorAll('section');
const navLink = document.querySelectorAll('nav__link');

/* --- Helper Functions --- */
// Dynamically set multiple attributes to an element at once
function setAttributes(el, attrs) {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

/* --- Main Functions --- */
function buildNav() {
    // Loop over the sections
    for (section of sections) {
        console.log(section.id);
        // Create menu links with a classname of 'nav__link'
        const li = document.createElement('li');
        li.classList.add('nav__link');

        // Create anchors to link to page sections
        const anchor = document.createElement('a');
        setAttributes(anchor, {'href': '#'+section.id});

        // Set anchor text to the data value of page sections
        anchor.textContent = `${section.dataset.nav}`;

        // Append anchor menu links
        li.appendChild(anchor);

        // Append menu links to the nav list
        navList.append(li);
    };
}

buildNav();