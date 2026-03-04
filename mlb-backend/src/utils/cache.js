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
        console.log(`💾 Cache SET: ${key}`);
    }

    get(key) {
        const timestamp = this.timestamps[key];
        if (!timestamp) {
            console.log(`❌ Cache MISS: ${key}`);
            return null;
        }

        const now = Date.now();
        if (now - timestamp > this.ttl) {
            console.log(`⏰ Cache EXPIRED: ${key}`);
            delete this.data[key];
            delete this.timestamps[key];
            return null;
        }

        console.log(`✅ Cache HIT: ${key}`);
        return this.data[key];
    }

    clear() {
        this.data = {};
        this.timestamps = {};
        console.log(`🗑️ Cache cleared`);
    }
}

export const cache = new Cache();
