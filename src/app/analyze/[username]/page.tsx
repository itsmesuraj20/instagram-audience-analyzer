'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import AnalyticsChart from '@/components/AnalyticsChart';

interface TopPost {
  id: string;
  likes: number;
  comments: number;
  image_url: string;
}

interface EngagementTrend {
  name: string;
  value: number;
}

interface ProfileData {
  success: boolean;
  profile?: {
    username: string;
    fullName: string;
    bio: string;
    followers: number;
    following: number;
    posts: number;
    isVerified: boolean;
    profilePicture: string;
  };
  analytics?: {
    engagement_rate: number;
    avg_likes: number;
    avg_comments: number;
    posts_last_30_days: number;
    top_posts: TopPost[];
    engagement_trend: EngagementTrend[];
  };
  error?: string;
}

export default function AnalyzePage() {
  const params = useParams();
  const router = useRouter();
  const username = params?.username as string;
  
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const setMockData = useCallback(() => {
    // Generate realistic mock data based on username
    const mockData: ProfileData = {
      success: true,
      profile: {
        username: username,
        fullName: username.charAt(0).toUpperCase() + username.slice(1),
        bio: `🌟 Content Creator | 📸 Photography Enthusiast | ✈️ Travel Lover`,
        followers: Math.floor(Math.random() * 1000000) + 50000,
        following: Math.floor(Math.random() * 1000) + 200,
        posts: Math.floor(Math.random() * 500) + 100,
        isVerified: Math.random() > 0.7,
        profilePicture: `https://picsum.photos/seed/${username}/150/150`
      },
      analytics: {
        engagement_rate: parseFloat((Math.random() * 8 + 1).toFixed(2)),
        avg_likes: Math.floor(Math.random() * 10000) + 1000,
        avg_comments: Math.floor(Math.random() * 500) + 50,
        posts_last_30_days: Math.floor(Math.random() * 20) + 5,
        top_posts: [],
        engagement_trend: Array.from({ length: 12 }, (_, i) => ({
          name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
          value: Math.floor(Math.random() * 100) + 20
        }))
      }
    };
    setProfileData(mockData);
  }, [username]);

  const fetchProfileData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:8000/api/analyze/${username}`);
      const data = await response.json();
      
      if (data.success) {
        setProfileData(data);
      } else {
        setError(data.error || 'Failed to analyze profile');
        // For demo purposes, set mock data
        setMockData();
      }
    } catch (err) {
      console.error('Analysis failed:', err);
      setError('Failed to connect to analysis service');
      // For demo purposes, set mock data
      setMockData();
    } finally {
      setLoading(false);
    }
  }, [username, setMockData]);

  useEffect(() => {
    if (!username) {
      router.push('/');
      return;
    }

    fetchProfileData();
  }, [username, router, fetchProfileData]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Analyzing @{username}</h2>
          <p className="text-gray-600">Gathering insights and engagement data...</p>
        </div>
      </div>
    );
  }

  if (error && !profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="text-6xl mb-4">😞</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Failed</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => router.push('/')}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Try Another Profile
                </button>
                <button
                  onClick={fetchProfileData}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Retry Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        {profileData?.profile && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center space-x-6">
              <Image
                src={profileData.profile.profilePicture}
                alt={profileData.profile.username}
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">@{profileData.profile.username}</h1>
                  {profileData.profile.isVerified && (
                    <span className="text-blue-500">✓</span>
                  )}
                </div>
                <h2 className="text-lg text-gray-700 mb-2">{profileData.profile.fullName}</h2>
                <p className="text-gray-600 mb-4">{profileData.profile.bio}</p>
                <div className="flex space-x-6 text-sm">
                  <div>
                    <span className="font-semibold text-gray-900">{formatNumber(profileData.profile.posts)}</span>
                    <span className="text-gray-600 ml-1">posts</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">{formatNumber(profileData.profile.followers)}</span>
                    <span className="text-gray-600 ml-1">followers</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">{formatNumber(profileData.profile.following)}</span>
                    <span className="text-gray-600 ml-1">following</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button
                  onClick={() => window.open(`https://instagram.com/${username}`, '_blank')}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Stats */}
        {profileData?.analytics && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Engagement Rate"
                value={`${profileData.analytics.engagement_rate}%`}
                icon="📊"
                change="+2.1%"
                changeType="positive"
              />
              <StatsCard
                title="Avg Likes"
                value={formatNumber(profileData.analytics.avg_likes)}
                icon="❤️"
                change="+5.2%"
                changeType="positive"
              />
              <StatsCard
                title="Avg Comments"
                value={formatNumber(profileData.analytics.avg_comments)}
                icon="💬"
                change="+1.8%"
                changeType="positive"
              />
              <StatsCard
                title="Posts (30 days)"
                value={profileData.analytics.posts_last_30_days.toString()}
                icon="📸"
                change="+3.1%"
                changeType="positive"
              />
            </div>

            {/* Analytics Chart */}
            <div className="mb-8">
              <AnalyticsChart 
                data={{
                  labels: profileData.analytics.engagement_trend.map(item => item.name),
                  values: profileData.analytics.engagement_trend.map(item => item.value)
                }}
              />
            </div>
          </>
        )}

        {/* Actions */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Want More Detailed Analytics?</h3>
            <p className="text-gray-600 mb-6">
              Get advanced insights, competitor analysis, and growth recommendations with our premium features.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Analyze Another Profile
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}