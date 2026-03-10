import { useState, useEffect } from "react";
import { getNews } from "../api/news.service";
import type { News as NewsType } from "../api/news.service";
import { Loader } from "../components/Loader";
import { Toast } from "../components/Toast";
import type { ToastType } from "../components/Toast";

const News = () => {
    const [news, setNews] = useState<NewsType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState<ToastType>("success");

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const newsData = await getNews();
                setNews(newsData);
                setError(null);
            } catch (err) {
                console.error("Error loading news:", err);
                setError(err instanceof Error ? err.message : "Error al cargar noticias");
                setToastMessage("Error loading news. Please try again later.");
                setToastType("error");
                setShowToast(true);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const handleOpenArticle = (url?: string) => {
        if (url) {
            window.open(url, "_blank");
        }
    };

    return (
        <>
            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
                duration={3000}
                type={toastType}
            />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 md:p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-10 md:mb-12">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
                            📰 MLB News
                        </h1>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600">
                            Stay updated with the latest baseball news and updates
                        </p>
                    </div>

                    {loading && <Loader message="Cargando noticias..." size="large" />}

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            <p className="text-sm sm:text-base">Error: {error}</p>
                            <p className="text-xs sm:text-sm mt-2">
                                Verifica que el backend esté corriendo en http://localhost:3000
                            </p>
                        </div>
                    )}

                    {!loading && !error && news.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 sm:py-16 bg-white rounded-xl shadow-lg px-4">
                            <div className="text-4xl sm:text-5xl md:text-6xl mb-4">📡</div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No news available</h2>
                            <p className="text-xs sm:text-sm text-gray-600 text-center max-w-md">
                                Check back later for the latest MLB news and updates
                            </p>
                        </div>
                    )}

                    {!loading && !error && news.length > 0 && (
                        <div className="space-y-4 sm:space-y-6">
                            {news.map((article) => (
                                <article
                                    key={article.id}
                                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                                        {/* Image */}
                                        {article.image && (
                                            <div className="md:col-span-1 h-48 md:h-auto overflow-hidden bg-gray-200">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                                />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className={`p-4 sm:p-6 flex flex-col justify-between ${article.image ? 'md:col-span-2' : 'md:col-span-3'}`}>
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    {article.source && (
                                                        <span className="text-xs sm:text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                                                            {article.source}
                                                        </span>
                                                    )}
                                                    <span className="text-xs sm:text-sm text-gray-500">
                                                        {new Date(article.date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </span>
                                                </div>

                                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                                                    {article.title}
                                                </h2>

                                                <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 mb-4">
                                                    {article.description || article.content}
                                                </p>
                                            </div>

                                            {/* Read More Button */}
                                            <button
                                                onClick={() => handleOpenArticle(article.url)}
                                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-xs sm:text-sm"
                                            >
                                                Read More →
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export { News };