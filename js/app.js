/* --- Define Global Variables --- */
const navList = document.getElementById('nav__list');
const sections = document.querySelectorAll('section');
const navLink = document.querySelectorAll('nav__link');


buildNav();
createObserver();

/* --- Helper Functions --- */
// Dynamically set multiple attributes to an element at once
function setAttributes(el, attrs) {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

/* --- Main Functions --- */
/* Navigation is built dynamically as an unordered list */
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

/* It should be clear on the side nav which section is being viewed on scroll */
// Create an intersection observer to detect the visibility of a section
function createObserver() {
    let sectionOptions = {
        threshold: 0.7 // When 70% of a section is visible on viewport, execute the observer's callback function (activeSection)
    };

    let sectionObserver = new IntersectionObserver(activeSection, sectionOptions);

    // Target all the page sections to be observed
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Set side nav item to 'active' when 70% of the section is visible
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