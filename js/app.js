/**
 * 
 * Program requirements:
 * 1. Dynamically build the navigation as an unordered list.
 * 2. The burger menu icon should display a sliding side nav on smaller screens.
 * 3. Highlight the side nav item of section in viewport.
 * 4. Scroll to anchors from both navigations.
 * 5. Add a scroll to top button.
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESLint
 * 
 */

/* --- Define Global Variables --- */
const sections = document.querySelectorAll('section');
const scrollToTopButton = document.getElementById('scrollToTopBtn');

buildNav();
slideNav();
createObserver();

/* --- Helper Functions --- */
/**
 * 
 * @param {string} el - The element
 * @param {string} attrs - Multiple attributes to add to the element
 * @description Add multiple attributes to a single element
 */
function setAttributes(el, attrs) {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

/* --- Main Functions --- */
// Build menu
function buildNav() {
    const nav = document.getElementById('nav__list');

    for (section of sections) {
        const li = document.createElement('li');
        li.classList.add('nav__link');
        const anchor = document.createElement('a');
        setAttributes(anchor, {'href': '#'+section.id});
        anchor.textContent = `${section.dataset.nav}`;
        li.appendChild(anchor);
        nav.append(li);
    };
}

// Create a sliding side nav
function slideNav() {
    const burger = document.querySelector('.burger');
    const nav = document.getElementById('nav__list');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active-nav');
    })
}

// Use the Intersection Observer API to detect 50% visibility of a section
function createObserver() {
    let sectionOptions = {
        threshold: 0.5
    };

    let sectionObserver = new IntersectionObserver(activeSection, sectionOptions);

    // Target all the page sections to be observed
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/**
 * 
 * @param {object} entries - The callback receives this list of IntersectionObserverEntry objects and the observer
 */
function activeSection(entries) {
    entries.forEach(entry => {
        const sectionId = entry.target.id;
        const activeAnchor = document.getElementById(`side-nav__${sectionId}`);
        if (entry.isIntersecting) {
            activeAnchor.classList.add('active');
            activeAnchor.style.fontSize = '1.5rem';
        } else {
            activeAnchor.classList.remove('active');
            activeAnchor.style.fontSize = '1.1rem';
        }
    })
}

/**
 *
 *  Scroll to top event
 */

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});