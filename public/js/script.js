let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');
document.querySelector('#menu-icon').onclick = () =>{
    navbar.classList.toggle('active');
    search.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    search.classList.remove('active');
}

let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});


document.addEventListener('DOMContentLoaded', function() {
    let counter = document.getElementById('counter');
    let links = document.querySelectorAll('.add-cart');
    let count = 0;
  
    links.forEach(function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        count++;
        counter.innerText = count;
      });
    });
  });
