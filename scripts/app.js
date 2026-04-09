class BaseUrl {
    static baseUrl = (() => {
        // document.currentScript.src is the fully-resolved URL (e.g. http://localhost/scripts/app.js
        // or https://samhereis.github.io/umtul/scripts/app.js)
        const src = document.currentScript && document.currentScript.src;
        if (src) {
            const m = src.match(/^https?:\/\/[^/]+(.*\/)scripts\/app\.js$/);
            if (m) return m[1]; // "/" locally, "/umtul/" on GH Pages
        }
        return '/';
    })();
}