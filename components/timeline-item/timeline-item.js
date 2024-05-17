class TimelineItem extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        fetch(BaseUrl.baseUrl + "components/timeline-item/timeline-item.html")
            .then(response => response.text())
            .then(html => {
                html = html.replace(/\{baseUrl\}/g, BaseUrl.baseUrl);

                const template = document.createElement('template');
                template.innerHTML = html;

                shadowRoot.appendChild(template.content.cloneNode(true));

                shadowRoot.querySelector('.start').textContent = this.getAttribute('start');
                shadowRoot.querySelector('.end').textContent = this.getAttribute('end');

                shadowRoot.querySelector('.work').textContent = this.getAttribute('work');
                shadowRoot.querySelector('.company').textContent = this.getAttribute('company');
            })
            .catch(error => {
                console.error('Error fetching HTML:', error);
            });
    }
}

customElements.define('timeline-item', TimelineItem);