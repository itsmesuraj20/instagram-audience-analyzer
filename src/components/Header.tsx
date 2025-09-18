export default function Header() {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">IA</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Instagram Audience Analyzer</h1>
                            <p className="text-sm text-gray-500">Analyze your Instagram audience insights</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => window.location.href = '/connect'}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Connect Instagram
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Dashboard
                        </button>
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
            </div>
        </header>
    );
}