import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'SSL Secured',
      description: '256-bit encryption'
    },
    {
      icon: 'CheckCircle',
      label: 'Gov Certified',
      description: 'FEC approved platform'
    },
    {
      icon: 'Lock',
      label: 'Privacy Protected',
      description: 'GDPR compliant'
    },
    {
      icon: 'Eye',
      label: 'Audit Ready',
      description: 'Full transparency'
    }
  ];

  return (
    <div className="mt-8 p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Shield" size={16} color="var(--color-success)" />
        <h3 className="font-heading font-semibold text-sm text-text-primary">
          Security & Trust
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon 
              name={feature.icon} 
              size={14} 
              color="var(--color-success)" 
            />
            <div>
              <div className="text-xs font-caption font-semibold text-text-primary">
                {feature.label}
              </div>
              <div className="text-xs font-caption text-text-secondary">
                {feature.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t civic-border">
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <Icon name="Clock" size={12} />
          <span className="font-caption">
            Last security audit: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;