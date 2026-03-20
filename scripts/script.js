const button = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

button.addEventListener('click', () => {
    nav.classList.toggle('active');
});