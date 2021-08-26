export default class APIContext {
    constructor(basePath, accessToken) {
        this.basePath = basePath;
        this.accessToken = accessToken;
    }

    async fetch(url, options = {}, withAuth = true) {
        const config = options;
        config.headers = new Headers(config.headers);
        if (withAuth)
            config.headers.set("Authorization", `Bearer ${this.accessToken}`);
        const fullURL = new URL(url, this.basePath);
        console.log(
            `[${config.method || "GET"}]: ${fullURL.href}\n${[...config.headers]
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n")}\n${config.body || ""}`
        );
        const response = await fetch(fullURL, config);
        if (!response.ok)
            throw new Error(
                `${response.statusText} "${await response.text()}"`
            );
        return await response.json();
    }
}
