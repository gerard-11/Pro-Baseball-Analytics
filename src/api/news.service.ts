import { apiClient } from "./apiClient.ts"

export interface News {
    id: string;
    title: string;
    description: string;
    content?: string;
    date: string;
    source?: string;
    image?: string;
    url?: string;
}

export const getNews = async (): Promise<News[]> => {
    try {
        console.log("📡 Fetching MLB news from API...");
        const response = await apiClient.get("/news");
        console.log("✅ News data received:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching news:", error);
        throw error;
    }
};
