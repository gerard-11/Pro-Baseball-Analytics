import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        Pro Baseball Analytics
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Explore teams, discover players, and build your dream lineup
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {/* Teams Card */}
                    <Link to="/teams" className="group">
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-8 text-center h-full">
                            <div className="text-4xl mb-4">⚾</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Teams</h2>
                            <p className="text-gray-600 mb-4">
                                Browse all MLB teams and explore their rosters
                            </p>
                            <div className="text-blue-500 font-semibold group-hover:translate-x-2 transition duration-300">
                                Explore Teams →
                            </div>
                        </div>
                    </Link>

                    {/* Dream Team Card */}
                    <Link to="/dreamteam" className="group">
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-8 text-center h-full border-2 border-green-500">
                            <div className="text-4xl mb-4">🌟</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Dream Team</h2>
                            <p className="text-gray-600 mb-4">
                                Build your perfect lineup and assign players to positions
                            </p>
                            <div className="text-green-500 font-semibold group-hover:translate-x-2 transition duration-300">
                                Create Dream Team →
                            </div>
                        </div>
                    </Link>

                    {/* News Card */}
                    <Link to="/news" className="group">
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-8 text-center h-full">
                            <div className="text-4xl mb-4">📰</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">News</h2>
                            <p className="text-gray-600 mb-4">
                                Stay updated with the latest baseball news
                            </p>
                            <div className="text-blue-500 font-semibold group-hover:translate-x-2 transition duration-300">
                                Read News →
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Getting Started Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Getting Started</h2>
                    <ol className="space-y-4 text-gray-700">
                        <li className="flex gap-4">
                            <span className="text-2xl font-bold text-blue-500">1</span>
                            <div>
                                <p className="font-semibold">Explore Teams</p>
                                <p className="text-sm text-gray-600">Start by browsing all MLB teams to find your favorites</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-2xl font-bold text-blue-500">2</span>
                            <div>
                                <p className="font-semibold">Select Players</p>
                                <p className="text-sm text-gray-600">Click on a team to view its roster and add players to your Dream Team</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-2xl font-bold text-blue-500">3</span>
                            <div>
                                <p className="font-semibold">Assign Positions</p>
                                <p className="text-sm text-gray-600">Navigate to Dream Team and drag players to their positions on the field</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-2xl font-bold text-blue-500">4</span>
                            <div>
                                <p className="font-semibold">Save & Share</p>
                                <p className="text-sm text-gray-600">Export your Dream Team as JSON or copy it to share with friends</p>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export { Home };