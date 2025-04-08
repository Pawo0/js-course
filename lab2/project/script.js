const btn = document.getElementById('hamburger-btn');
const hamburgerElements = document.getElementsByClassName('hamburger-wrap');

btn.addEventListener('click', () =>{
    console.log('clicked')
    for (let item of hamburgerElements){
        item.classList.toggle("hidden")
    }
})