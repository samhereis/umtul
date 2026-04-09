
const urlRoutes = {
    404: {
        template: "pages/404.html",
        title: "Page not found",
        description: "Page not found",
    },
    "/": {
        template: "pages/home.html",
        title: "Home",
        description: "Umtul",
    },
    "/projects": {
        template: "pages/projects.html",
        title: "My projects",
        description: "My projects",
    }
};

// Read the current route from the hash (e.g. "#/projects" → "/projects")
const getRoutePath = () => {
    const hash = window.location.hash; // e.g. "" or "#/" or "#/projects"
    if (!hash || hash === '#' || hash === '#/') return '/';
    return hash.slice(1); // strip the leading "#"
};

document.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("nav a")) return;
    e.preventDefault();
    const routePath = target.getAttribute('href'); // e.g. "/" or "/projects"
    window.location.hash = routePath;
    // hashchange event will fire and call urlLocationHandler
});

const urlLocationHandler = () => {
    setPage(getRoutePath());
};

const setPage = async (routePath) => {
    const route = urlRoutes[routePath] || urlRoutes["404"];
    try {
        const response = await fetch(BaseUrl.baseUrl + route.template);
        let html = await response.text();
        html = html.replace(/\{baseUrl\}/g, BaseUrl.baseUrl);
        document.getElementById("main-content").innerHTML = html;
    } catch (err) {
        document.getElementById("main-content").innerHTML = "<p>Failed to load page.</p>";
    }
    document.title = route.title;

    document.querySelectorAll('nav a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === routePath);
    });
};

window.addEventListener('hashchange', urlLocationHandler);

urlLocationHandler();
