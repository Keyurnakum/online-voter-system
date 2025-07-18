import React from 'react';


const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Sign In', description: 'Access your voter account' },
    { id: 'register', label: 'Register', description: 'Create new voter account' }
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-4 py-3 rounded-md civic-transition text-center ${
              activeTab === tab.id
                ? 'bg-surface text-primary civic-shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <div className="font-body font-semibold">{tab.label}</div>
            <div className="text-xs font-caption opacity-75">{tab.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AuthTabs;