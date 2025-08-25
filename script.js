let highestZ = 1;

class Paper {
    holdingPaper = false;
    prevMouseX = 0;
    prevMouseY = 0;
    mouseX = 0;
    mouseY = 0;
    currentPaperX = 0;
    currentPaperY = 0;

    constructor(paper) {
        this.paper = paper;
        this.init();
    }

    init() {
        // Mouse down (start dragging)
        this.paper.addEventListener('mousedown', (e) => {
            this.holdingPaper = true;
            this.paper.style.zIndex = highestZ++;
            this.prevMouseX = e.clientX;
            this.prevMouseY = e.clientY;
        });

        // Mouse move (dragging)
        document.addEventListener('mousemove', (e) => {
            if (!this.holdingPaper) return;

            let dx = e.clientX - this.prevMouseX;
            let dy = e.clientY - this.prevMouseY;

            this.currentPaperX += dx;
            this.currentPaperY += dy;

            this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;

            this.prevMouseX = e.clientX;
            this.prevMouseY = e.clientY;
        });

        // Mouse up (stop dragging)
        window.addEventListener('mouseup', () => {
            this.holdingPaper = false;
        });
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => new Paper(paper));
