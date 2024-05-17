class SkillItem extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        fetch(BaseUrl.baseUrl + "components/skill-item/skill-item.html")
            .then(response => response.text())
            .then(html => {
                html = html.replace(/\{baseUrl\}/g, BaseUrl.baseUrl);

                const template = document.createElement('template');
                template.innerHTML = html;

                shadowRoot.appendChild(template.content.cloneNode(true));

                shadowRoot.querySelector('.skill-text').textContent = this.getAttribute('value');
            })
            .catch(error => {
                console.error('Error fetching HTML:', error);
            });
    }
}

customElements.define('skill-item', SkillItem);