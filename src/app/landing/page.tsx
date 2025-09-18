'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
    const [instagramUrl, setInstagramUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const extractUsername = (url: string) => {
        // Extract username from various Instagram URL formats
        const patterns = [
            /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9._]+)\/?/,
            /(?:https?:\/\/)?(?:www\.)?ig\.me\/([a-zA-Z0-9._]+)\/?/,
            /^@?([a-zA-Z0-9._]+)$/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) {
                return match[1];
            }
        }
        return null;
    };

    const handleAnalyze = async () => {
        if (!instagramUrl.trim()) {
            setError('Please enter an Instagram profile URL or username');
            return;
        }

        setLoading(true);
        setError('');

        const username = extractUsername(instagramUrl.trim());
        if (!username) {
            setError('Invalid Instagram URL or username format');
            setLoading(false);
            return;
        }

        // Redirect to analysis page
        router.push(`/analyze/${username}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">IA</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">InstagramAnalyzer</h1>
                                <p className="text-sm text-gray-500">Analyze any Instagram profile</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors">
                                Pricing
                            </button>
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Analyze Any
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Instagram </span>
                            Profile
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Get deep insights into engagement, growth trends, and audience analytics for any public Instagram account.
                            No login required - just paste the profile URL!
                        </p>
                    </div>

                    {/* URL Input Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            Enter Instagram Profile URL
                        </h2>

                        <div className="max-w-2xl mx-auto">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={instagramUrl}
                                        onChange={(e) => setInstagramUrl(e.target.value)}
                                        placeholder="instagram.com/username or @username"
                                        className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                        onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                                    />
                                </div>
                                <button
                                    onClick={handleAnalyze}
                                    disabled={loading}
                                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Analyzing...
                                        </div>
                                    ) : (
                                        '🔍 Analyze Profile'
                                    )}
                                </button>
                            </div>

                            {error && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">{error}</p>
                                </div>
                            )}

                            <div className="mt-6 text-sm text-gray-500">
                                <p>
                                    ✨ Try examples:
                                    <button
                                        className="text-purple-600 hover:underline ml-1"
                                        onClick={() => setInstagramUrl('instagram.com/cristiano')}
                                    >
                                        cristiano
                                    </button>
                                    ,
                                    <button
                                        className="text-purple-600 hover:underline ml-1"
                                        onClick={() => setInstagramUrl('instagram.com/selenagomez')}
                                    >
                                        selenagomez
                                    </button>
                                    ,
                                    <button
                                        className="text-purple-600 hover:underline ml-1"
                                        onClick={() => setInstagramUrl('instagram.com/kyliejenner')}
                                    >
                                        kyliejenner
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Engagement Analytics</h3>
                            <p className="text-gray-600">
                                Track likes, comments, and engagement rates across all posts to understand audience interaction.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                <span className="text-2xl">📈</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth Trends</h3>
                            <p className="text-gray-600">
                                Analyze posting frequency, growth patterns, and optimal posting times for maximum reach.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Content Insights</h3>
                            <p className="text-gray-600">
                                Discover top-performing content types, hashtag effectiveness, and audience preferences.
                            </p>
                        </div>
                    </div>

                    {/* Demo Section */}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
                        <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
                        <p className="text-xl mb-6 opacity-90">
                            Watch how InstagramAnalyzer reveals deep insights about any profile
                        </p>
                        <div className="grid md:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="text-3xl font-bold">2.5M+</div>
                                <div className="text-sm opacity-80">Profiles Analyzed</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">98%</div>
                                <div className="text-sm opacity-80">Accuracy Rate</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">Real-time</div>
                                <div className="text-sm opacity-80">Data Updates</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">30s</div>
                                <div className="text-sm opacity-80">Analysis Time</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">IA</span>
                                </div>
                                <span className="font-bold text-gray-900">InstagramAnalyzer</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                The most powerful Instagram analytics platform for creators, businesses, and marketers.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Product</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-purple-600">Features</a></li>
                                <li><a href="#" className="hover:text-purple-600">Pricing</a></li>
                                <li><a href="#" className="hover:text-purple-600">API</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-purple-600">Documentation</a></li>
                                <li><a href="#" className="hover:text-purple-600">Help Center</a></li>
                                <li><a href="#" className="hover:text-purple-600">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-purple-600">About</a></li>
                                <li><a href="#" className="hover:text-purple-600">Blog</a></li>
                                <li><a href="#" className="hover:text-purple-600">Privacy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
                        © 2025 InstagramAnalyzer. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}