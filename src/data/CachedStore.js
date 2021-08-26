export default class CachedStore {
    constructor(
        apiContext,
        type,
        listPath,
        itemPath = (id) => `${listPath}/${id}`
    ) {
        this.listPath = listPath;
        this.itemPath = itemPath;
        this.apiContext = apiContext;
        this.cache = new Map();
        this.lastAllCache = 0;
        this.type = type;
    }

    updateCache(id, data) {
        this.cache.set(id, {
            ...this.cache.get(id),
            ...data,
            cacheTime: new Date(),
        });
    }

    async get(id, forceRefresh = false) {
        if (
            forceRefresh ||
            !this.cache.has(id) ||
            new Date() - this.cache.get(id).cacheTime > 2 * 60000
        ) {
            const data = this.apiContext.request(itemPath(id));
            this.updateCache(data[this.type]);
        }
        return this.cache.get(id);
    }

    async getAll(forceRefresh = false) {
        if (forceRefresh || new Date() - this.lastAllCache > 2 * 60000) {
            const data = await this.apiContext.request(this.listPath);
            const list = data[this.type + "s"];
            for (let item of list) {
                this.updateCache(item.id, item);
            }
            this.lastAllCache = new Date();
        }
        return [...this.cache];
    }
}
