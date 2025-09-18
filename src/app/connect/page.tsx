'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';

interface ConnectionStep {
  step: number;
  title: string;
  description: string;
  details?: string;
  example?: string;
}

interface SetupGuide {
  title: string;
  steps: ConnectionStep[];
  current_status: {
    client_id_configured: boolean;
    token_available: boolean;
  };
}

export default function ConnectInstagram() {
  const [setupGuide, setSetupGuide] = useState<SetupGuide | null>(null);
  const [authUrl, setAuthUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Fetch setup guide
    fetch('http://localhost:8000/api/setup-guide')
      .then(res => res.json())
      .then(data => setSetupGuide(data))
      .catch(err => console.error('Failed to fetch setup guide:', err));
  }, []);

  const handleConnectInstagram = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:8000/api/instagram/connect');
      const data = await response.json();
      
      if (data.success) {
        setAuthUrl(data.auth_url);
        setMessage('Instagram authorization URL generated! Click the button below to connect.');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Connection failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToken = async () => {
    if (!accessToken) {
      setMessage('Please enter an access token');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/instagram/save-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: accessToken }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(`Success! ${data.message}\n${data.instruction}`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Failed to save token: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              🔗 Connect Your Instagram Account
            </h1>

            {/* Current Status */}
            {setupGuide && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">📊 Current Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${setupGuide.current_status.client_id_configured ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">Client ID Configured</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${setupGuide.current_status.token_available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">Access Token Available</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Connect Section */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-4">🚀 Quick Connect</h3>
              <p className="text-blue-800 mb-4">
                Your Instagram app is already configured! Click below to start the OAuth flow:
              </p>
              
              <div className="flex gap-4 mb-4">
                <button
                  onClick={handleConnectInstagram}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors disabled:opacity-50"
                >
                  {loading ? '🔄 Generating...' : '🔗 Generate Auth URL'}
                </button>
                
                {authUrl && (
                  <button
                    onClick={() => window.open(authUrl, '_blank')}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    📱 Open Instagram Auth
                  </button>
                )}
              </div>

              {authUrl && (
                <div className="mb-4 p-3 bg-white rounded border">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Authorization URL:</label>
                  <input
                    type="text"
                    value={authUrl}
                    readOnly
                    className="w-full p-2 text-xs bg-gray-100 border rounded"
                  />
                </div>
              )}

              {message && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <pre className="text-sm text-yellow-800 whitespace-pre-wrap">{message}</pre>
                </div>
              )}
            </div>

            {/* Token Input Section */}
            <div className="mb-8 p-6 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-4">🔑 Save Access Token</h3>
              <p className="text-green-800 mb-4">
                After completing Instagram authorization, paste your access token here:
              </p>
              
              <div className="flex gap-4">
                <input
                  type="text"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="Paste your Instagram access token here..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleSaveToken}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  💾 Save Token
                </button>
              </div>
            </div>

            {/* Setup Guide */}
            {setupGuide && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">📋 {setupGuide.title}</h3>
                <div className="space-y-4">
                  {setupGuide.steps.map((step) => (
                    <div key={step.step} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{step.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                          {step.details && (
                            <p className="text-gray-500 text-xs mb-2">{step.details}</p>
                          )}
                          {step.example && (
                            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                              {step.example}
                            </pre>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Dashboard */}
            <div className="flex justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}