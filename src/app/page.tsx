'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import AnalyticsChart from '@/components/AnalyticsChart';
import UserTable from '@/components/UserTable';

interface InstagramData {
  connected: boolean;
  user_info?: any;
  analytics?: {
    total_followers: number;
    engagement_rate: number;
    avg_likes: number;
    posts_this_month: number;
    recent_media: any[];
  };
  error?: string;
}

export default function Home() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [instagramData, setInstagramData] = useState<InstagramData | null>(null);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    // Check backend connection
    fetch('http://localhost:8000/health')
      .then(res => res.json())
      .then(data => setBackendStatus(data.status))
      .catch(() => setBackendStatus('disconnected'));

    // Fetch Instagram analytics
    fetch('http://localhost:8000/api/analytics')
      .then(res => res.json())
      .then(data => {
        setInstagramData(data);
        if (!data.connected) {
          setShowSetup(true);
        }
      })
      .catch(err => {
        console.error('Failed to fetch Instagram data:', err);
        setShowSetup(true);
      });
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (showSetup || (instagramData && !instagramData.connected)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Connect Your Instagram Account</h2>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">📋 Setup Instructions</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                  <li>Go to <a href="https://developers.facebook.com/apps/" target="_blank" rel="noopener noreferrer" className="underline">Facebook Developers</a> and create a new app</li>
                  <li>Add "Instagram Basic Display" product to your app</li>
                  <li>Set redirect URI to: <code className="bg-blue-200 px-1 rounded">http://localhost:8000/auth/instagram/callback</code></li>
                  <li>Copy your App ID and App Secret</li>
                  <li>Update your backend/.env file with the credentials</li>
                </ol>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Environment Configuration</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  {`INSTAGRAM_CLIENT_ID=your_app_id_here
INSTAGRAM_CLIENT_SECRET=your_app_secret_here
INSTAGRAM_REDIRECT_URI=http://localhost:8000/auth/instagram/callback`}
                </pre>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => window.open('http://localhost:8000/auth/instagram', '_blank')}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  🔗 Connect Instagram
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  🔄 Refresh
                </button>
              </div>

              {instagramData?.error && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-800 text-sm">{instagramData.error}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Use real data if available, fallback to demo data
  const analytics = instagramData?.analytics;
  const followers = analytics?.total_followers || 125600;
  const engagementRate = analytics?.engagement_rate || 4.2;
  const avgLikes = analytics?.avg_likes || 2800;
  const postsThisMonth = analytics?.posts_this_month || 24;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Connection Status */}
        <div className="mb-6 flex items-center justify-between">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${backendStatus === 'healthy'
              ? 'bg-green-100 text-green-800'
              : backendStatus === 'checking'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${backendStatus === 'healthy' ? 'bg-green-500' :
                backendStatus === 'checking' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
            Backend: {backendStatus === 'healthy' ? 'Connected' :
              backendStatus === 'checking' ? 'Checking...' : 'Disconnected'}
          </div>

          {instagramData?.connected && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              <div className="w-2 h-2 rounded-full mr-2 bg-purple-500"></div>
              Instagram: Connected ({instagramData.user_info?.username})
            </div>
          )}
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Followers"
            value={formatNumber(followers)}
            change="+12.5%"
            changeType="positive"
            icon="👥"
          />
          <StatsCard
            title="Engagement Rate"
            value={`${engagementRate}%`}
            change="+0.8%"
            changeType="positive"
            icon="💫"
          />
          <StatsCard
            title="Avg. Likes"
            value={formatNumber(avgLikes)}
            change="-2.1%"
            changeType="negative"
            icon="❤️"
          />
          <StatsCard
            title="Posts This Month"
            value={postsThisMonth.toString()}
            change="+8"
            changeType="positive"
            icon="📸"
          />
        </div>

        {/* Analytics Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AnalyticsChart />

          {/* Audience Demographics */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Audience Demographics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Age 18-24</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Age 25-34</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Age 35-44</span>
                  <span className="font-medium">22%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Age 45+</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Table */}
        <UserTable instagramData={instagramData} />
      </main>
    </div>
  );
}
