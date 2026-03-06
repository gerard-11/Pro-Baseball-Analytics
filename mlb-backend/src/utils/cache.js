// Simple in-memory cache para almacenar datos de la API
class Cache {
    constructor() {
        this.data = {};
        this.timestamps = {};
        this.ttl = 1000 * 60 * 60; // 1 hora de TTL
    }

    set(key, value) {
        this.data[key] = value;
        this.timestamps[key] = Date.now();

    }

    get(key) {
        const timestamp = this.timestamps[key];
        if (!timestamp) {

            return null;
        }

        const now = Date.now();
        if (now - timestamp > this.ttl) {

            delete this.data[key];
            delete this.timestamps[key];
            return null;
        }

        return this.data[key];
    }

    clear() {
        this.data = {};
        this.timestamps = {};
    }
}

export const cache = new Cache();
