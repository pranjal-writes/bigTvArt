const canvas = document.getElementById('canvasParticle')
const ctx = canvas.getContext("2d")


//set canvas size
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// store particles

const particles = []
const numParticles = 50

// particle constructor


class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 3 + 1;  //random size between 1 to 4

        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = `rgba(212, 71, 255,${Math.random()*0.7})`

    }

    update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1
        }
    }

        draw(){
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill()
        }
    }
    

    function initParticles() {
    for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y))
    }
}

const mouse = {
    x: null,
    y: null,
    radius: 100
}
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x
    mouse.y = e.y
})
function handleParticles() {
    particles.forEach((particle) => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);


        if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx)
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = Math.cos(angle) * force * 5
            const directionY = Math.sin(angle) * force * 5
            particle.x -= directionX
            particle.y -= directionY

        }
        particle.update()
        particle.draw()
    })
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles()
    requestAnimationFrame(animate)
}
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight
    particles.length = 0
    initParticles()
})

initParticles()
animate()



















// button hover animation

let btns = document.querySelectorAll('.link');
console.log(btns)
btns.forEach(btn =>{
btn.onmousemove = function(e){
    let x = e.pageX - btn.offsetLeft;
    let y = e.pageY - btn.offsetTop;
    console.log(x,y);
    
    btn.style.setProperty('--x', x + 'px')
    btn.style.setProperty('--y', y + 'px')
}
})






// card hover animation

let cards = document.querySelectorAll('.card')


cards.forEach(card =>{
    card.onmousemove = function(e){
        let x = e.pageX - card.offsetLeft;
        let y = e.pageY - card.offsetTop;

        card.style.setProperty('--x', x + 'px')
        card.style.setProperty('--y', y + 'px')
    }
})



// sticky navabar

document.addEventListener('scroll', ()=>{
    const nav = document.getElementById('navigation1');

    if(window.scrollY>0){
        nav.classList.add('glass-fill')
        
    }else{
        nav.classList.remove('glass-fill')
        
    }
})



// hero animation
window.onload = function(){
    
    setTimeout(function(){
        document.querySelector('#text-1>div').classList.add('translate1');
        document.querySelector('#text-2>div').classList.add('translate2');
        document.querySelector('#text-3>div').classList.add('show');
        document.querySelector('.text-section>.btn').classList.add('show');
        document.querySelector('.text-section').classList.remove('opacity0');
    }, 1000)
}



// responsive navbar
const menu = document.querySelector('.menu');



menu.onclick = function(){
    const visibility = menu.getAttribute("data-visible")
    if(visibility==="false"){
        document.querySelector('#navigation2>.item-container').classList.remove('nav-close')
        document.querySelector('#navigation2>.item-container').classList.add('nav-open')
    document.querySelector('#navigation2').classList.add('glass-fill')
    document.querySelector('.menu>img').src="images/close.svg"
    menu.setAttribute("data-visible", true)
    document.querySelector('#navigation2').style.zIndex ="999"
    
    }else{
        document.querySelector('#navigation2>.item-container').classList.add('nav-close')
        document.querySelector('#navigation2>.item-container').classList.remove('nav-open')
        
    document.querySelector('.menu>img').src="images/menu.svg"
    menu.setAttribute("data-visible", false)
    setTimeout(() => {
        document.querySelector('#navigation2').classList.remove('glass-fill')
        
        document.querySelector('#navigation2').style.zIndex ="0"
    }, 700);
    
    
    
        
        
        
    
    }
    

}
