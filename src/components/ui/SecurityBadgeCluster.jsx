import React, { useState } from 'react';
import Icon from '../AppIcon';

const SecurityBadgeCluster = () => {
  const [showDetails, setShowDetails] = useState(false);

  const securityCertifications = [
    {
      id: 'ssl',
      label: 'SSL Secured',
      icon: 'Shield',
      status: 'active',
      description: '256-bit SSL encryption protects all data transmission',
      validUntil: '2025-12-31',
      issuer: 'DigiCert Inc.'
    },
    {
      id: 'gov-cert',
      label: 'Gov Certified',
      icon: 'CheckCircle',
      status: 'active',
      description: 'Certified by Federal Election Commission',
      validUntil: '2025-11-15',
      issuer: 'FEC Certification Authority'
    },
    {
      id: 'privacy',
      label: 'Privacy Compliant',
      icon: 'Lock',
      status: 'active',
      description: 'GDPR and CCPA compliant data handling',
      validUntil: 'Ongoing',
      issuer: 'Internal Audit'
    },
    {
      id: 'security-audit',
      label: 'Security Audited',
      icon: 'Search',
      status: 'active',
      description: 'Independent security audit completed',
      validUntil: '2025-06-30',
      issuer: 'CyberSec Solutions'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'warning':
        return 'warning';
      case 'expired':
        return 'error';
      default:
        return 'muted';
    }
  };

  return (
    <div className="relative">
      {/* Main Badge Cluster */}
      <div 
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => setShowDetails(!showDetails)}
      >
        {securityCertifications.slice(0, 2).map((cert) => (
          <div
            key={cert.id}
            className="flex items-center space-x-1 px-2 py-1 bg-success/10 rounded-full civic-transition hover:bg-success/20"
          >
            <Icon 
              name={cert.icon} 
              size={12} 
              color={`var(--color-${getStatusColor(cert.status)})`}
            />
            <span className="text-xs font-caption text-success font-semibold">
              {cert.label}
            </span>
          </div>
        ))}
        
        {/* More Indicator */}
        <div className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-full civic-transition hover:bg-muted/80">
          <span className="text-xs font-caption text-text-secondary">
            +{securityCertifications.length - 2} more
          </span>
          <Icon 
            name={showDetails ? "ChevronUp" : "ChevronDown"} 
            size={12} 
            className="text-text-secondary"
          />
        </div>
      </div>

      {/* Detailed Security Information */}
      {showDetails && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-surface border civic-border rounded-lg civic-shadow-md z-1200 p-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b civic-border">
              <Icon name="Shield" size={16} color="var(--color-primary)" />
              <h3 className="font-heading font-semibold text-primary">Security Certifications</h3>
            </div>

            {securityCertifications.map((cert) => (
              <div key={cert.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={cert.icon} 
                      size={14} 
                      color={`var(--color-${getStatusColor(cert.status)})`}
                    />
                    <span className="font-body font-semibold text-text-primary">
                      {cert.label}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-caption bg-${getStatusColor(cert.status)}/10 text-${getStatusColor(cert.status)}`}>
                    {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary font-caption">
                  {cert.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span className="font-caption">Issued by: {cert.issuer}</span>
                  <span className="font-mono">Valid until: {cert.validUntil}</span>
                </div>
              </div>
            ))}

            {/* Trust Score */}
            <div className="border-t civic-border pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-body font-semibold text-text-primary">Trust Score</span>
                <span className="font-mono font-bold text-lg text-success">98/100</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full civic-transition" style={{ width: '98%' }}></div>
              </div>
              <p className="text-xs text-text-secondary font-caption mt-2">
                Based on security audits, certifications, and compliance standards
              </p>
            </div>

            {/* Last Verification */}
            <div className="border-t civic-border pt-4">
              <div className="flex items-center space-x-2 text-xs text-text-secondary">
                <Icon name="Clock" size={12} />
                <span className="font-caption">
                  Last verified: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityBadgeCluster;