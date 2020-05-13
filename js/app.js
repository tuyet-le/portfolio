/**
 * 
 * Program requirements:
 * 1. Dynamically build the navigation as an unordered list.
 * 2. Highlight the side nav item of section in viewport.
 * 3. Scroll to anchors from both navigations.
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESLint
 * 
 */

/* --- Define Global Variables --- */
const sections = document.querySelectorAll('section');

buildNav();
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
    const navList = document.getElementById('nav__list');

    for (section of sections) {
        const li = document.createElement('li');
        li.classList.add('nav__link');
        const anchor = document.createElement('a');
        setAttributes(anchor, {'href': '#'+section.id});
        anchor.textContent = `${section.dataset.nav}`;
        li.appendChild(anchor);
        navList.append(li);
    };
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
            activeAnchor.classList.add('active')
        } else {
            activeAnchor.classList.remove('active');
        }
    })
}