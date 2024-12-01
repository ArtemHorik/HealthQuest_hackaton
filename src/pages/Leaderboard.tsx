import React from 'react';
import { Trophy, Medal, Award, MapPin } from 'lucide-react';
import { BULGARIAN_USERS } from '../data/users';
import { PixelAvatarDisplay } from '../components/character/PixelAvatarDisplay';

const BulgarianFlag = () => (
  <div className="w-6 h-4 rounded overflow-hidden shadow-sm">
    <div className="h-1/3 bg-white" />
    <div className="h-1/3 bg-green-600" />
    <div className="h-1/3 bg-red-600" />
  </div>
);

export function Leaderboard() {
  const sortedUsers = [...BULGARIAN_USERS].sort((a, b) => b.totalPoints - a.totalPoints);
  const topUsers = sortedUsers.slice(0, 3);
  const otherUsers = sortedUsers.slice(3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        <div className="flex items-center gap-2">
          <BulgarianFlag />
          <span className="text-white">Bulgaria</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {topUsers.map((user, index) => (
          <div
            key={user.id}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1">
              {index === 0 && <div className="w-full h-full bg-yellow-400" />}
              {index === 1 && <div className="w-full h-full bg-gray-400" />}
              {index === 2 && <div className="w-full h-full bg-orange-400" />}
            </div>
            
            <div className="mb-4">
              {index === 0 && <Trophy className="w-8 h-8 text-yellow-400 mx-auto" />}
              {index === 1 && <Medal className="w-8 h-8 text-gray-400 mx-auto" />}
              {index === 2 && <Award className="w-8 h-8 text-orange-400 mx-auto" />}
            </div>

            <div className="w-16 h-16 mx-auto mb-3">
              <PixelAvatarDisplay avatarData={user.avatar} size={64} />
            </div>

            <h3 className="text-lg font-semibold text-white mb-1">{user.name}</h3>
            <div className="flex items-center justify-center gap-1 text-gray-300 text-sm mb-2">
              <MapPin className="w-3 h-3" />
              <span className="text-white font-medium">{user.city}</span>
            </div>
            <p className="text-purple-400 font-semibold">{user.totalPoints.toLocaleString()} points</p>
            
            <div className="mt-2 flex items-center justify-center gap-1">
              <span className={`w-2 h-2 rounded-full ${
                user.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
              }`} />
              <span className="text-xs text-white/70">
                {user.status === 'online' ? 'online' : user.lastActive}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-lg">
        {otherUsers.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 border-b border-white/10 last:border-0"
          >
            <div className="flex items-center gap-4">
              <span className="text-gray-400 w-8">{index + 4}</span>
              <div className="w-10 h-10">
                <PixelAvatarDisplay avatarData={user.avatar} size={40} />
              </div>
              <div>
                <span className="text-white">{user.name}</span>
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <MapPin className="w-3 h-3" />
                  <span className="text-white font-medium">{user.city}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-purple-400 font-semibold">
                {user.totalPoints.toLocaleString()} points
              </span>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className={`w-2 h-2 rounded-full ${
                  user.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                }`} />
                <span className="text-xs text-white/70">
                  {user.status === 'online' ? 'online' : user.lastActive}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}