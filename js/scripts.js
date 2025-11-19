const products = [
    { id: 1, name: "Dog food (10kg)", price: 8500, image: "../img/dog-food.jpg", description: "Premium dog food" },
    { id: 2, name: "Cat food (5kg)", price: 6000, image: "../img/cat-food.jpg", description: "Premium cat food" },
    { id: 3, name: "Dog toys", price: 15000, image: "../img/dog-toy.jpg", description: "Some dog toys" },
    { id: 4, name: "Cat toys", price: 3500, image: "../img/cat-toy.jfif", description: "Some cat toys" },
    { id: 5, name: "XYZ", price: 0, image: "../img/", description: "XYZ" },
    { id: 6, name: "XYZ", price: 0, image: "../img/", description: "XYZ" },
    { id: 7, name: "XYZ", price: 0, image: "../img/", description: "XYZ" },
    { id: 8, name: "XYZ", price: 0, image: "../img/", description: "XYZ" },
    { id: 9, name: "XYZ", price: 0, image: "../img/", description: "XYZ" },
    { id: 10, name: "XYZ", price: 0, image: "../img/", description: "XYZa" },
    { id: 11, name: "XYZ", price: 0, image: "../img/", description: "XYZ" },
    { id: 12, name: "XYZ", price: 0, image: "../img/", description: "XYZ" }
];

let cart = [];

function setupScrollEffects() {
    const mainNav = document.getElementById('mainNav');
    const mainContent = document.getElementById('mainContent');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            mainNav.classList.add('show');
            mainContent.classList.add('show');
        }
    });
}

function scrollToGallery() {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}