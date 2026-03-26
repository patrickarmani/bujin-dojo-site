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
        aside: 'Seja bem vindo(a) à nossa escola para treinamento de Ninjas em Belo Horizonte. Aqui ensinamos Ninjutsu da escola Bujinkan.'
    },
    {
        caption: 'Técnica de torção',
        aside: 'No Ninjutsu treinamos torções. Neste treino desenvolvemos controle corporal, aplicação técnica e consciência do movimento.'
    },
    {
        caption: 'Técnicas de projeção',
        aside: 'No Ninjutsu, as técnicas de projeção não servem apenas para derrubar — elas ensinam controle. Desenvolvem domínio emocional, aumentam a autoconfiança e elevam o controle do corpo e da mente.'
    },
    {
        caption: 'Técnicas de Imobilização',
        aside: 'Algumas vezes é necessário controlar uma situação com segurança e responsabilidade. Aqui você desenvolve e aprimora o senso de autocontrole e a tomada de decisão sob pressão.'
    },
    {
        caption: 'Técnicas de punho e chutes',
        aside: 'Dentro do grupo de técnicas o Ninjutsu também oferece variantes na forma de golpes com os punhos e chutes, bem como suas defesas',
    },
    {
        caption: 'Uniforme de Treino',
        aside: 'Nós usamos Kimono e camisa na cor preta, Hakama e jikka tabi. Até o segundo mês você tem liberdade para frequentar a aula sem o kimono. Em momento oportuno você adquire o uniforme comprelo.'
    },
    {
        caption: 'Treino com armas tradicionais',
        aside: 'Com um arsenal rico e diversificado o Ninjutusu possui numerosas armas de combate tradicionais como bastões, espadas, armas de corte e acessórios que podem ser adaptados para situações cotidianas.'
    },
    {
        caption: 'Avanço técnico',
        aside: 'No dojo respeitamos o limite do corpo e do aprendizado. Entendemos que cada individuo é único e o(a) praticante avança do absoluto zero progredindo dentro dos 10 kyus ou graus que antecedem a faixa preta.'
    },
    {
        caption: 'Propósito',
        aside: 'O Ninjtusu não visa campeonatos ou competições. Treinamos com foco em auto-defesa e sobrevivência, estratégia de luta e estilo de vida.'
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

//pertence à pagina about.html //

const asideCloseBtn = document.querySelector('.aside-close');
const sobreAside = document.getElementById('sobreAside');

if (asideCloseBtn && sobreAside) {
    asideCloseBtn.addEventListener('click', () => {
        sobreAside.style.display = 'none';
    });
}