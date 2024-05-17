class ProjectItem extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        fetch(BaseUrl.baseUrl + "components/project-item/project-item.html")
            .then(response => response.text())
            .then(html => {
                html = html.replace(/\{baseUrl\}/g, BaseUrl.baseUrl);

                const template = document.createElement('template');
                template.innerHTML = html;

                shadowRoot.appendChild(template.content.cloneNode(true));
                shadowRoot.querySelector('.project-icon').setAttribute('src', this.getAttribute('project-icon'));
                shadowRoot.querySelector('.project-name').textContent = this.getAttribute('project-name');

                tryAddLink(shadowRoot, this, "steam-link", "steam");
                tryAddLink(shadowRoot, this, "play-store-link", "google-play");
                tryAddLink(shadowRoot, this, "app-store-link", "app-store");
                tryAddLink(shadowRoot, this, "internet-link", "globe");
                tryAddLink(shadowRoot, this, "github-link", "github");
            })
            .catch(error => {
                console.error('Error fetching HTML:', error);
            });
    }
}

const tryAddLink = (shadowRoot, projectItem, attributeName, iconName) => {

    const steamLink = projectItem.getAttribute(attributeName);

    if (steamLink) {
        const projectLink = document.createElement('project-link');
        projectLink.innerHTML = `
            <div class="project-link">
                <a href="${steamLink}" target="_blank">
                    <img class="project-link-icon" src="${BaseUrl.baseUrl}img/icons/${iconName}.png" alt="">
                </a>
            </div>
        `;
        shadowRoot.querySelector('.project-links-container').appendChild(projectLink);
    }
}

customElements.define('project-item', ProjectItem);