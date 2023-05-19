// Barra de navegação

const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
    const active = nav.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', 'true')
    if (active) {
        event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
    } else {
        event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
    }
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);
// Fim da barra de navegação

// Nome

function typeWrite(elemento) {
    const texto = elemento.innerHTML.split('');
    elemento.innerHTML = '';
    texto.forEach((letra, i) => {
        setTimeout(() => elemento.innerHTML += letra, 300 * i);
    });
}

const nome = document.querySelector('#text');
typeWrite(nome);

// Fim do nome

// Título projetos

const canvas = document.getElementById('canvas1')
const contexto = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let arrayDosPontos = []

//handle mouse
const mouse = {
 x: null,
 y: null,
 radius: 150
}

window.addEventListener('mousemove', function(event){
  mouse.x = event.x
  mouse.y = event.y
})

contexto.fillStyle = 'green'
contexto.font = '150% oswald'
contexto.fillText('My Projects', 30, 50)
const coordenadasDoTexto = contexto.getImageData(0, 0, 200, 100)

class Pontos{
  constructor(x, y){
    this.x = x
    this.y = y
    this.size = 3
    this.baseX = this.x
    this.baseY = this.y
    this.density = (Math.random() * 40) + 5 
  }
  draw(){
    contexto.fillStyle = '#fff'
    contexto.beginPath()
    contexto.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    contexto.closePath()
    contexto.fill()
  }
  update(){
    let direcaoX = mouse.x - this.x 
    let direcaoY = mouse.y - this.y 
    let distancia = Math.sqrt(direcaoX * direcaoX + direcaoY * direcaoY)
    let focaDeDirecaoX = direcaoX / distancia
    let focaDeDirecaoY = direcaoY / distancia
    let maxdistancia = mouse.radius
    let forca = (maxdistancia - distancia) / maxdistancia
    let directionX = focaDeDirecaoX * forca * this.density
    let directionY = focaDeDirecaoY * forca * this.density


    if(distancia < mouse.radius){
      this.x -= directionX
      this.y -= directionY
     
    }else{
      
      if(this.x !== this.baseX){
        let direcaoX = this.x - this.baseX
        this.x -= direcaoX/5 
      }
      if(this.y !== this.baseY){
        let direcaoY = this.y - this.baseY
        this.y -= direcaoY/5 
      }
    }  
  }
}

function init(){
  arrayDosPontos = []
  for(let  y = 0, y2 = coordenadasDoTexto.height; y < y2; y++){
    for(let x = 0, x2 = coordenadasDoTexto.width; x < x2; x++){
      if(coordenadasDoTexto.data[(y * 4 * coordenadasDoTexto.width) + (x * 4) + 1] > 10){
        let positionX = x
        let positionY = y
        arrayDosPontos.push(new Pontos(positionX * 9 , positionY * 10))
      }
    }
  }
}
init()
console.log(arrayDosPontos)

function animate(){
  contexto.clearRect(0, 0, canvas.width, canvas.height)
  for(let i = 10; i < arrayDosPontos.length; i++){
    arrayDosPontos[i].draw()    
    arrayDosPontos[i].update()    
  }
  requestAnimationFrame(animate)
}
animate()
// fim

// Carousel Imagens

const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
        });

        this.carouselArray.slice(0, 5).forEach((el, i) =>{
            el.classList.add(`gallery-item-${i+1}`);
        });
    }

    setCurrentState(direction) {
        if(direction.className == 'gallery-controls-previous') {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else{
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }

    setControls() {
        this.carouselControls.forEach(control => {
            galleryControlsContainer.appendChild(document.createElement('button-gallery')).className = `gallery-controls-${control}`;
            document.querySelector(`.gallery-controls-${control}`).innerHTML = control;
        });
    }

    useControls() {
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();

// Fim do Carousel