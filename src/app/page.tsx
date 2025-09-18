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
  demo_data?: {
    total_followers: number;
    engagement_rate: number;
    avg_likes: number;
    posts_this_month: number;
    total_posts: number;
  };
  error?: string;
  oauth_url?: string;
  instructions?: string;
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

              {instagramData?.error && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800">{instagramData.error}</p>
                </div>
              )}

              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">📋 Quick Start</h3>
                <p className="text-blue-800 mb-3">Your Instagram app is already configured! Just complete the OAuth flow:</p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                  <li>Click &quot;Connect Instagram&quot; below</li>
                  <li>Log in to your Instagram account</li>
                  <li>Authorize the app to access your data</li>
                  <li>Copy the access token from the response</li>
                  <li>Add it to your .env file as INSTAGRAM_ACCESS_TOKEN</li>
                  <li>Refresh this page</li>
                </ol>
              </div>

              {instagramData?.demo_data && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">📊 Demo Data Preview</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-gray-600">Followers</div>
                      <div className="text-lg font-bold text-purple-600">{formatNumber(instagramData.demo_data.total_followers)}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-600">Engagement</div>
                      <div className="text-lg font-bold text-purple-600">{instagramData.demo_data.engagement_rate}%</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-600">Avg Likes</div>
                      <div className="text-lg font-bold text-purple-600">{instagramData.demo_data.avg_likes}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-600">This Month</div>
                      <div className="text-lg font-bold text-purple-600">{instagramData.demo_data.posts_this_month}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-600">Total Posts</div>
                      <div className="text-lg font-bold text-purple-600">{instagramData.demo_data.total_posts}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => window.location.href = '/connect'}
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
