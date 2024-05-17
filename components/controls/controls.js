class Controls extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML =
            `
            <style>
                .controls-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
            
                .controls {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #f0f0f0;
                    padding: 10px;
                    border-top: 1px solid #ccc;
                }
            
                .control {
                    cursor: pointer;
                    margin: 0 10px;
                }
            
                .control i {
                    font-size: 20px;
                }
            </style>
            <div class="controls">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css">

                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/projects">Contact</a>
                    <a href="/contact">Contact</a>
                </nav>
            </div>
            <script src="/scripts/router.js"></script>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('pages-control', Controls);