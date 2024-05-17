class ShortHeadInfo extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        fetch(BaseUrl.baseUrl + "components/short-head-info/short-head-info.html")
            .then(response => response.text())
            .then(html => {
                html = html.replace(/\{baseUrl\}/g, BaseUrl.baseUrl);

                const template = document.createElement('template');
                template.innerHTML = html;

                shadowRoot.appendChild(template.content.cloneNode(true));
                shadowRoot.querySelector('.large').textContent = this.getAttribute('large');
                shadowRoot.querySelector('.small').textContent = this.getAttribute('small');
            })
            .catch(error => {
                console.error('Error fetching HTML:', error);
            });
    }
}

customElements.define('short-head-info', ShortHeadInfo);