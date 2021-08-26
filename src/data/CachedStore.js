import EventEmitter from "events";

export default class CachedStore extends EventEmitter {
    constructor(
        apiContext,
        type,
        listPath,
        idProp = "id",
        itemPath = (id) => `${listPath}/${id}`
    ) {
        super();
        this.listPath = listPath;
        this.itemPath = itemPath;
        this.apiContext = apiContext;
        this.cache = new Map();
        this.lastAllCache = 0;
        this.type = type;
        this.idProp = idProp;
        this.subscribers = new Set();
    }

    updateCache(id, data) {
        this.cache.set(id, {
            ...this.cache.get(id),
            ...data,
            cacheTime: new Date(),
        });
        const sendOut = [...this.cache.values()];
        this.subscribers.forEach((sub) => sub(sendOut));
        this.emit("change", id, this.cache.get(id));
    }

    async get(id, forceRefresh = false) {
        if (
            forceRefresh ||
            !this.cache.has(id) ||
            new Date() - this.cache.get(id).cacheTime > 2 * 60000
        ) {
            const data = this.apiContext.fetch(itemPath(id));
            this.updateCache(data[this.type]);
        }
        return this.cache.get(id);
    }

    async getAll(forceRefresh = false) {
        if (forceRefresh || new Date() - this.lastAllCache > 2 * 60000) {
            const data = await this.apiContext.fetch(this.listPath);
            const list = data[this.type + "s"];
            for (let item of list) {
                this.updateCache(item[this.idProp], item);
            }
            this.lastAllCache = new Date();
        }
        return [...this.cache.values()];
    }

    subscribe(subscription) {
        this.subscribers.add(subscription);
        subscription([...this.cache.values()]);
        return () => this.subscribers.delete(subscription);
    }
}
