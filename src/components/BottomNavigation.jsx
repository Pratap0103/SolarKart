import React from 'react';
import { Sun, Activity, Wrench, Play, User } from 'lucide-react';

export default function BottomNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Sun },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'care_panel', label: 'Care Panel', icon: Play },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <IconComponent size={20} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
