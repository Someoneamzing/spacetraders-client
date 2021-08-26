export default class APIContext {
    constructor(basePath, accessToken) {
        this.basePath = basePath;
        this.accessToken = accessToken;
    }

    async fetch(url, options, withAuth = true) {
        const config = {
            ...options,
            headers: {
                ...options.headers,
            },
        };
        if (withAuth) config.headers["Authorization"] = this.accessToken;
        const response = await fetch(new URL(url, this.basePath), config);
        if (!response.ok())
            throw new Error(
                `${response.statusText} "${await response.text()}"`
            );
        return await response.json();
    }
}
