
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

// Strip the base path prefix from an absolute pathname to get the route key
const toRoutePath = (pathname) => {
    const base = BaseUrl.baseUrl.replace(/\/$/, ''); // e.g. "/umtul" or ""
    if (base && pathname.startsWith(base)) {
        pathname = pathname.slice(base.length);
    }
    // Treat /index.html (Live Server default) and empty string as home
    if (!pathname || pathname === '/index.html') return '/';
    return pathname;
};

document.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("nav a")) {
        return;
    }
    e.preventDefault();
    const routePath = target.getAttribute('href'); // e.g. "/" or "/projects"
    const fullPath = BaseUrl.baseUrl.replace(/\/$/, '') + routePath;
    window.history.pushState({}, "", fullPath);
    urlLocationHandler();
});

const urlLocationHandler = () => {
    const routePath = toRoutePath(window.location.pathname);
    setPage(routePath);
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
};

window.onpopstate = urlLocationHandler;
window.route = urlLocationHandler;

urlLocationHandler();