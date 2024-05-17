
const urlRoutes = {
    404: {
        template: "pages/404.html",
        title: "Page not found",
        description: "Page not found",
    },
    "/": {
        template:"pages/home.html",
        title: "Home",
        description: "Umtul",
    },
    "/projects": {
        template: "pages/projects.html",
        title: "My projects",
        description: "My projects",
    }
};

document.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("nav a")) {
        return;
    }
    e.preventDefault();
    urlRoute();
});

const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();
};

const urlLocationHandler = () => {
    const location = window.location.pathname;
    setPage(location);
};

const setPage = async (location) => {
    if (location.length == 0) {
        location = BaseUrl.baseUrl;
    }

    const route = urlRoutes[location] || urlRoutes["404"];
    let html = await fetch(BaseUrl.baseUrl + route.template).then((response) => response.text());

    html = html.replace(/\{baseUrl\}/g, BaseUrl.baseUrl);

    document.getElementById("main-content").innerHTML = html;

    document.title = route.title;
}

window.onpopstate = urlLocationHandler;
window.route = urlRoute;

window.history.pushState({}, "", "/");
urlLocationHandler();