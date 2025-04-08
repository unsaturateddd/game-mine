document.addEventListener('DOMContentLoaded', () => {
    class Particle {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.reset();
            this.size = Math.random() * 2 + 1;
            this.color = `hsl(${Math.random() * 60 + 180}, 70%, 50%)`;
        }

        reset() {
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > this.canvas.width + 50 || this.x < -50 || 
                this.y > this.canvas.height + 50 || this.y < -50) {
                this.reset();
            }
        }

        draw() {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = Array.from({ length: 100 }, () => new Particle(canvas));
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
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
    }

    initBoard();
    startButton.addEventListener('click', generateGame);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles.forEach(particle => particle.reset());
    });
});