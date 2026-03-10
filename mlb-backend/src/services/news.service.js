// Sample MLB news data
// In a production environment, this would fetch from a real news API
export const getMLBNews = async () => {
    try {
        console.log("📰 Fetching MLB news...");

        // Sample news data
        const newsData = [
            {
                id: "news_001",
                title: "Spring Training Begins: Teams Prepare for 2026 Season",
                description: "MLB teams are gearing up for spring training as they prepare for the upcoming 2026 season. Players and coaches are working hard to get ready for opening day.",
                content: "Spring training is underway across Florida and Arizona as teams make final preparations for the 2026 MLB season. Players are focusing on conditioning and fine-tuning their skills after the offseason.",
                date: new Date().toISOString(),
                source: "MLB Official",
                image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
                url: "https://www.mlb.com"
            },
            {
                id: "news_002",
                title: "Star Player Signs Record-Breaking Contract",
                description: "A major league star has signed a contract extension that could make them one of the highest-paid players in baseball history.",
                content: "In a landmark deal, one of baseball's brightest stars has agreed to a multi-year contract extension with significant financial terms.",
                date: new Date(Date.now() - 86400000).toISOString(),
                source: "ESPN",
                image: "https://images.unsplash.com/photo-1596577570815-5d8c9ad4a216?w=800&q=80",
                url: "https://www.espn.com"
            },
            {
                id: "news_003",
                title: "Rookie Sensation Impresses in Spring Training",
                description: "An exciting new talent is turning heads during spring training with impressive batting average and defensive skills.",
                content: "A young prospect is making a strong case for a spot on the major league roster with outstanding performances in exhibition games.",
                date: new Date(Date.now() - 172800000).toISOString(),
                source: "MLB.com",
                image: "https://images.unsplash.com/photo-1516156282330-a2e5b0e016a2?w=800&q=80",
                url: "https://www.mlb.com"
            },
            {
                id: "news_004",
                title: "Team Announces Stadium Improvements",
                description: "A major league franchise announces significant upgrades and renovations to their home stadium for the upcoming season.",
                content: "The team has revealed plans for extensive renovations including new seating, upgraded facilities, and enhanced fan experiences.",
                date: new Date(Date.now() - 259200000).toISOString(),
                source: "Team News",
                image: "https://images.unsplash.com/photo-1613148913519-c1f93b0fb8a4?w=800&q=80",
                url: "https://www.mlb.com"
            },
            {
                id: "news_005",
                title: "Hall of Famer Retires After Legendary Career",
                description: "A baseball icon announces retirement after an impressive career spanning multiple decades in the major leagues.",
                content: "One of baseball's greatest players has officially announced their retirement, ending a storied career filled with achievements and records.",
                date: new Date(Date.now() - 345600000).toISOString(),
                source: "AP Sports",
                image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
                url: "https://www.apnews.com"
            }
        ];

        return newsData;
    } catch (error) {
        console.error("❌ Error fetching news:", error);
        throw error;
    }
};
