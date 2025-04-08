document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    // Автоматическая настройка размеров
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    
    // Класс частицы
    class Particle {
        constructor() {
            this.reset();
            this.size = Math.random() * 2 + 1;
            this.color = `hsl(${Math.random() * 60 + 180}, 70%, 50%)`;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width + 50 || this.x < -50 || 
                this.y > canvas.height + 50 || this.y < -50) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Инициализация частиц
    const particles = Array.from({ length: 100 }, () => new Particle());

    // Анимация
    function animate() {
        ctx.fillStyle = 'rgba(9, 32, 63, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }

    // Запуск
    window.addEventListener('resize', resizeCanvas);
    animate();
});
    const BOARD_SIZE = 25;
    const MINE_IMG = 'svgs/cross.png';
    const STAR_IMG = 'svgs/stars.svg';
    
    const board = document.getElementById('board');
    const startButton = document.getElementById('start');
    const difficultySelect = document.getElementById('difficulty');

    function initBoard() {
        board.innerHTML = '';
        for(let i = 0; i < BOARD_SIZE; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            board.appendChild(cell);
        }
    }

    function generateGame() {
    const difficulty = parseInt(difficultySelect.value);
    const cells = board.querySelectorAll('.cell');
    const mines = new Set();

    // Проверка минимального значения
    if(difficulty < 1 || difficulty > 24) {
        console.error("Некорректное количество мин");
        return;
    }

    while(mines.size < difficulty) {
        const randomIndex = Math.floor(Math.random() * BOARD_SIZE);
        mines.add(randomIndex);
    }

    cells.forEach((cell, index) => {
        const img = document.createElement('img');
        img.src = mines.has(index) ? MINE_IMG : STAR_IMG;
        cell.innerHTML = '';
        cell.appendChild(img);
    });
});
