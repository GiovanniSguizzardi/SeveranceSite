document.addEventListener("DOMContentLoaded", function () {
    // Seleciona os elementos do menu
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav_links");
    const logo = document.getElementById("logo"); // Seleciona a logo

    if (!menuToggle || !navLinks) {
        console.error("Erro: Elementos do menu não encontrados.");
        return;
    }

    // Evento de clique no menu hambúrguer
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");

        // Alterna o ícone do menu
        menuToggle.innerHTML = navLinks.classList.contains("active") ? "✖" : "&#9776;";
    });

    // Adiciona scroll suave ao clicar nos links do menu
    document.querySelectorAll(".nav_links a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

                // Fecha o menu no mobile ao clicar em um item
                if (window.innerWidth <= 1024) {
                    navLinks.classList.remove("active");
                    menuToggle.innerHTML = "&#9776;";
                }
            }
        });
    });

    // Evento de clique na logo para voltar ao topo
    if (logo) {
        logo.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" }); // Rola suavemente para o topo
        });
    }

    // Seleção do canvas e contexto
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    // Criar imagem
    const image = new Image();
    image.src = 'Lumon_Globo.png'; // Caminho da imagem

    // Variáveis de posição e movimento
    let positionX = 0;
    let positionY = 0;
    let imageWidth, imageHeight;
    let speedX = 1.5; // Velocidade no eixo X
    let speedY = 1.5; // Velocidade no eixo Y
    let movementX = speedX;
    let movementY = speedY;

    // Ajusta o tamanho do canvas de acordo com a tela
    const resizeCanvas = () => {
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;

        // Atualiza o tamanho do canvas com base no CSS
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        // Redimensiona a imagem proporcionalmente
        imageWidth = canvas.width * 0.15;
        imageHeight = canvas.height * 0.20;

        // Mantém a posição relativa da imagem ao redimensionar
        if (oldWidth && oldHeight) {
            positionX = (positionX / oldWidth) * canvas.width;
            positionY = (positionY / oldHeight) * canvas.height;
        } else {
            positionX = Math.random() * (canvas.width - imageWidth);
            positionY = Math.random() * (canvas.height - imageHeight);
        }
    };

    // Função de animação
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

        // Desenhar a imagem movendo
        ctx.drawImage(image, positionX, positionY, imageWidth, imageHeight);

        // Atualizar posição
        positionX += movementX;
        positionY += movementY;

        // Reverter direção ao bater nas bordas
        if (positionX + imageWidth > canvas.width || positionX < 0) {
            movementX = -movementX;
        }
        if (positionY + imageHeight > canvas.height || positionY < 0) {
            movementY = -movementY;
        }

        requestAnimationFrame(animate); // Loop da animação
    };

    // Aguarda o carregamento da imagem antes de iniciar a animação
    image.onload = () => {
        resizeCanvas();
        animate();
    };

    // Redimensiona o canvas quando a janela é redimensionada (com debounce)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
        }, 200);
    });
});