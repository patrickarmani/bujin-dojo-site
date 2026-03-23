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
        caption: 'Bu Jin Dojo',
        aside: 'Seja bem vindo(a) à nossa escola para treinamento de Ninjas. Aqui ensinamos Ninjutsu da escola Bujinkan.'
    },
    {
        caption: 'Técnica de torção',
        aside: 'As torções trabalham controle corporal, aplicação técnica e consciência do movimento.'
    },
    {
        caption: 'Técnicas de projeção',
        aside: 'No Ninjutsu, as técnicas de projeção não servem apenas para derrubar — elas ensinam controle. Desenvolvem domínio emocional, aumentam a autoconfiança e elevam o controle do corpo e da mente.'
    },
    {
        caption: 'Técnicas de Imobilização',
        aside: 'As imobilizações ajudam a controlar uma situação com segurança e responsabilidade. Nela se desenvolve e aprimora o senso de autocontrole e tomada de decisão sob pressão.'
    },
    {
        caption: 'Uniforme de Treino',
        aside: 'Nosso uniforme é composto de Kimono da cor preta, Hakama e os emblemas de graduação. O kimono é exigido após o 2º mês de prática, os empblemas e o simbolos da escola apos a primeira graduação. O Hakama quando orientado(a).'
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