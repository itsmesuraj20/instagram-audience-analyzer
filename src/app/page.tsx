'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import AnalyticsChart from '@/components/AnalyticsChart';
import UserTable from '@/components/UserTable';

export default function Home() {
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    fetch('http://localhost:8000/health')
      .then(res => res.json())
      .then(data => setBackendStatus(data.status))
      .catch(() => setBackendStatus('disconnected'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            backendStatus === 'healthy' 
              ? 'bg-green-100 text-green-800' 
              : backendStatus === 'checking'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              backendStatus === 'healthy' ? 'bg-green-500' : 
              backendStatus === 'checking' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            Backend: {backendStatus === 'healthy' ? 'Connected' : 
                     backendStatus === 'checking' ? 'Checking...' : 'Disconnected'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Followers"
            value="125.6K"
            change="+12.5%"
            changeType="positive"
            icon="👥"
          />
          <StatsCard
            title="Engagement Rate"
            value="4.2%"
            change="+0.8%"
            changeType="positive"
            icon="💫"
          />
          <StatsCard
            title="Avg. Likes"
            value="2.8K"
            change="-2.1%"
            changeType="negative"
            icon="❤️"
          />
          <StatsCard
            title="Posts This Month"
            value="24"
            change="+8"
            changeType="positive"
            icon="📸"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AnalyticsChart />
          
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

        <UserTable />
      </main>
    </div>
  );
}
