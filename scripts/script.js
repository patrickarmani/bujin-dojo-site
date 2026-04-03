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
        caption: 'Aprenda a se proteger de verdade',
        aside: 'Treinamento seguro, progressivo e adaptado para todos os níveis.'
    },
    {
        caption: 'Aprenda Técnicas de torção',
        aside: 'No Ninjutsu ensinamos e treinamos torções. Tecnicas importantes para o controle corporal do adversário e consciência do movimento de defesa.'
    },
    {
        caption: 'Aprenda Técnicas de projeção',
        aside: 'No Ninjutsu, ensinamos a remover o equilibrio do adversário levando-o ao solo . O(A) praticante desenvolve domínio emocional, autoconfiança, trabalha a mobilidade e equilíbrio.'
    },
    {
        caption: 'Aprenda Técnicas de Imobilização',
        aside: 'Nem sempre o combate se faz necessário. Aqui você desenvolve e aprimora o senso de autocontrole e a tomada de decisão sob pressão e a imobilização de pessoas agressivas.'
    },
    {
        caption: 'Aprenda Técnicas de punho e chutes',
        aside: 'Dentro do grupo de técnicas o Ninjutsu também oferece variantes na forma de golpes com os punhos e chutes, bem como suas defesas',
    },
    {
        caption: 'O que devo vestir para o treino?',
        aside: 'Nós usamos Kimono e camisa na cor preta, Hakama e jikka tabi. Até o segundo mês você tem liberdade para frequentar a aula sem o kimono. Em momento oportuno você adquire o uniforme completo.'
    },
    {
        caption: 'Aprenda a usar um arsenal tradicional',
        aside: 'Com um arsenal rico e diversificado o Ninjutusu possui numerosas armas de combate tradicionais como bastões, espadas, armas de corte e acessórios que podem ser adaptados para situações cotidianas."'
    },
    {
        caption: 'Avanço técnico',
        aside: 'No Bu Jin dojo respeitamos o limite do corpo e do aprendizado de cada um. Entendemos que cada individuo é único e o(a) praticante avança do absoluto zero progredindo dentro dos 10 kyus ou graus que antecedem a faixa preta.'
    },
    {
        caption: 'O ninjtusu é pra você?',
        aside: 'Existe uma versão sua mais forte, mais consciente e mais preparada. Aqui é onde ela desperta. Nem tudo pode ser explicado. Algumas coisas só podem ser vividas.'
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


const revealElements = document.querySelectorAll('.reveal');
const header = document.querySelector('header');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.88;

    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    revealOnScroll();
});

window.addEventListener('load', revealOnScroll);