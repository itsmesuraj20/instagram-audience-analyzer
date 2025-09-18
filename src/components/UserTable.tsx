'use client';

import { useState, useEffect } from 'react';

interface User {
    id: string;
    username: string;
    followers: number;
    engagement: number;
    lastPost: string;
    verified: boolean;
}

interface UserTableProps {
    instagramData?: any;
}

export default function UserTable({ instagramData }: UserTableProps) {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        // Mock data - in real app, fetch from API
        const mockUsers: User[] = [
            {
                id: '1',
                username: '@john_doe',
                followers: 15420,
                engagement: 4.2,
                lastPost: '2 hours ago',
                verified: true
            },
            {
                id: '2',
                username: '@jane_smith',
                followers: 8930,
                engagement: 3.8,
                lastPost: '5 hours ago',
                verified: false
            },
            {
                id: '3',
                username: '@mike_wilson',
                followers: 24150,
                engagement: 5.1,
                lastPost: '1 day ago',
                verified: true
            },
            {
                id: '4',
                username: '@sarah_jones',
                followers: 12680,
                engagement: 4.7,
                lastPost: '3 hours ago',
                verified: false
            },
            {
                id: '5',
                username: '@alex_brown',
                followers: 18750,
                engagement: 3.9,
                lastPost: '6 hours ago',
                verified: true
            }
        ];
        setUsers(mockUsers);
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Top Audience Accounts</h3>
                <p className="text-sm text-gray-500 mt-1">Your most engaged followers</p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Followers
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Engagement
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last Post
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                                                <span className="text-white font-medium text-sm">
                                                    {user.username.charAt(1).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900 flex items-center">
                                                {user.username}
                                                {user.verified && (
                                                    <span className="ml-2 text-blue-500">✓</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {user.followers.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.engagement > 4.5
                                            ? 'bg-green-100 text-green-800'
                                            : user.engagement > 3.5
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                        {user.engagement}%
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.lastPost}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}