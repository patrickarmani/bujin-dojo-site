const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

const track = document.getElementById('carouselTrack');
const container = document.getElementById('carouselContainer');
const images = document.querySelectorAll('.carousel-image');
const captionBtn = document.getElementById('captionBtn');
const aside = document.getElementById('carouselAside');
const asideText = document.getElementById('asideText');
const carouselCounter = document.getElementById('carouselCounter');

const imageData = [
    {
        caption: 'Kimono e espada',
        aside: 'A espada simboliza tradição, precisão técnica e responsabilidade no treino marcial.'
    },
    {
        caption: 'Técnica de torção',
        aside: 'As torções trabalham controle corporal, aplicação técnica e consciência do movimento.'
    },
    {
        caption: 'Treino com espada',
        aside: 'O treino com armas desenvolve atenção, postura, coordenação e disciplina.'
    },
    {
        caption: 'Defesa pessoal',
        aside: 'A prática marcial ajuda o aluno a reagir com mais equilíbrio e segurança.'
    },
    {
        caption: 'Postura marcial',
        aside: 'A postura correta transmite firmeza, presença e base sólida para o movimento.'
    },
    {
        caption: 'Treino técnico',
        aside: 'A repetição técnica fortalece memória corporal e qualidade de execução.'
    },
    {
        caption: 'Disciplina no dojo',
        aside: 'O dojo é um espaço de respeito, constância e aperfeiçoamento pessoal.'
    },
    {
        caption: 'Movimento corporal',
        aside: 'Treinar o corpo com consciência melhora mobilidade, reação e estabilidade.'
    },
    {
        caption: 'Arte e tradição',
        aside: 'A arte marcial preserva valores tradicionais e promove crescimento interior.'
    }
];

let currentIndex = 0;
let startX = 0;
let isDragging = false;

function updateActiveImage() {
    images.forEach((img, index) => {
        img.classList.toggle('active', index === currentIndex);
    });
}

function updateCarousel() {
    const imageWidth = images[0].offsetWidth + 12;
    const currentTranslate = -(currentIndex * imageWidth);
    track.style.transform = `translateX(${currentTranslate}px)`;

    captionBtn.textContent = imageData[currentIndex].caption;
    asideText.textContent = imageData[currentIndex].aside;
    carouselCounter.textContent = `${currentIndex + 1}/${images.length}`;

    aside.classList.remove('active');
    updateActiveImage();
}

function nextSlide() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
}

captionBtn.addEventListener('click', () => {
    aside.classList.toggle('active');
});

container.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
}, { passive: true });

container.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) {
        nextSlide();
    } else if (diff < -50) {
        prevSlide();
    }
});

container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

container.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.clientX;
    const diff = startX - endX;

    if (diff > 50) {
        nextSlide();
    } else if (diff < -50) {
        prevSlide();
    }
});

container.addEventListener('mouseleave', () => {
    isDragging = false;
});

window.addEventListener('resize', updateCarousel);

updateCarousel();