//Mobile button
let mobileButton = document.querySelector('.mobile-btn');
let menuButton = document.querySelector('.mobile-menu');

mobileButton.addEventListener('click', function(){
    this.classList.toggle('active');
    menuButton.classList.toggle('active');
})
