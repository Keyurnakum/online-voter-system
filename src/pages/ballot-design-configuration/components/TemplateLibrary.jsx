import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TemplateLibrary = ({ onTemplateSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showTemplateDetails, setShowTemplateDetails] = useState(null);

  const templates = [
    {
      id: 'federal-general',
      name: 'Federal General Election',
      category: 'federal',
      description: 'Standard template for federal elections including President, Senate, and House races',
      contests: 5,
      estimatedTime: '15-20 minutes',
      lastUsed: '2024-11-05',
      popularity: 95,
      features: ['Multi-level contests', 'Party affiliations', 'Write-in options', 'Accessibility compliant'],
      preview: 'https://images.unsplash.com/photo-1541872705-1f73c6400ec9?w=400&h=300&fit=crop'
    },
    {
      id: 'state-primary',
      name: 'State Primary Election',
      category: 'state',
      description: 'Template for state-level primary elections with party-specific ballots',
      contests: 8,
      estimatedTime: '10-15 minutes',
      lastUsed: '2024-08-15',
      popularity: 87,
      features: ['Party-specific ballots', 'Candidate photos', 'Ranked choice voting', 'Multi-language support'],
      preview: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=400&h=300&fit=crop'
    },
    {
      id: 'local-municipal',
      name: 'Municipal Election',
      category: 'local',
      description: 'Local government elections including mayor, city council, and ballot measures',
      contests: 6,
      estimatedTime: '8-12 minutes',
      lastUsed: '2024-10-20',
      popularity: 78,
      features: ['Local measures', 'Non-partisan races', 'District-based voting', 'Community focus'],
      preview: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop'
    },
    {
      id: 'school-board',
      name: 'School Board Election',
      category: 'local',
      description: 'Educational district elections with candidate profiles and education focus',
      contests: 3,
      estimatedTime: '5-8 minutes',
      lastUsed: '2024-09-12',
      popularity: 65,
      features: ['Education-focused', 'Candidate statements', 'District boundaries', 'Parent-friendly'],
      preview: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop'
    },
    {
      id: 'corporate-board',
      name: 'Corporate Board Election',
      category: 'organizational',
      description: 'Corporate governance elections for board members and shareholder proposals',
      contests: 4,
      estimatedTime: '6-10 minutes',
      lastUsed: '2024-07-30',
      popularity: 72,
      features: ['Shareholder voting', 'Proxy options', 'Financial disclosures', 'Corporate governance'],
      preview: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
    },
    {
      id: 'union-election',
      name: 'Union Representative Election',
      category: 'organizational',
      description: 'Labor union elections for representatives and contract ratification',
      contests: 2,
      estimatedTime: '4-6 minutes',
      lastUsed: '2024-06-18',
      popularity: 58,
      features: ['Member verification', 'Contract voting', 'Representative selection', 'Union-specific'],
      preview: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Templates' },
    { value: 'federal', label: 'Federal Elections' },
    { value: 'state', label: 'State Elections' },
    { value: 'local', label: 'Local Elections' },
    { value: 'organizational', label: 'Organizational' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateUse = (template) => {
    onTemplateSelect(template);
    setShowTemplateDetails(null);
  };

  const getPopularityColor = (popularity) => {
    if (popularity >= 80) return 'text-success';
    if (popularity >= 60) return 'text-warning';
    return 'text-text-secondary';
  };

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Header */}
      <div className="p-6 border-b civic-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">Template Library</h2>
            <p className="text-sm text-text-secondary font-caption">Pre-configured ballot templates for quick setup</p>
          </div>
          <Button
            variant="outline"
            iconName="Upload"
            iconPosition="left"
          >
            Import Template
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            className="w-full sm:w-48"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-text-secondary mb-4" />
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">No Templates Found</h3>
            <p className="text-text-secondary font-caption">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="bg-card border civic-border rounded-lg overflow-hidden civic-shadow-sm hover:civic-shadow-md civic-transition">
                {/* Template Preview */}
                <div className="h-48 bg-muted relative overflow-hidden">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-caption bg-white/90 ${getPopularityColor(template.popularity)}`}>
                      {template.popularity}% popular
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading font-semibold text-text-primary">{template.name}</h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-caption">
                      {template.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-secondary font-caption mb-4 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Template Stats */}
                  <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Vote" size={12} />
                      <span className="font-caption">{template.contests} contests</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span className="font-caption">{template.estimatedTime}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.features.slice(0, 2).map((feature) => (
                      <span key={feature} className="text-xs bg-muted text-text-secondary px-2 py-1 rounded font-caption">
                        {feature}
                      </span>
                    ))}
                    {template.features.length > 2 && (
                      <span className="text-xs text-text-secondary font-caption">
                        +{template.features.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      fullWidth
                      onClick={() => handleTemplateUse(template)}
                      iconName="Download"
                      iconPosition="left"
                    >
                      Use Template
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowTemplateDetails(template)}
                      iconName="Eye"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Template Details Modal */}
      {showTemplateDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1300 p-4">
          <div className="bg-surface rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b civic-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  {showTemplateDetails.name}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTemplateDetails(null)}
                  iconName="X"
                />
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Template Preview */}
              <div className="h-64 bg-muted rounded-lg overflow-hidden">
                <img
                  src={showTemplateDetails.preview}
                  alt={showTemplateDetails.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>

              {/* Description */}
              <div>
                <h4 className="font-heading font-semibold text-text-primary mb-2">Description</h4>
                <p className="text-text-secondary font-caption">{showTemplateDetails.description}</p>
              </div>

              {/* Template Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-body font-semibold text-text-primary mb-1">Contests</h5>
                  <p className="text-text-secondary font-caption">{showTemplateDetails.contests} contests included</p>
                </div>
                <div>
                  <h5 className="font-body font-semibold text-text-primary mb-1">Estimated Time</h5>
                  <p className="text-text-secondary font-caption">{showTemplateDetails.estimatedTime}</p>
                </div>
                <div>
                  <h5 className="font-body font-semibold text-text-primary mb-1">Last Used</h5>
                  <p className="text-text-secondary font-caption">{showTemplateDetails.lastUsed}</p>
                </div>
                <div>
                  <h5 className="font-body font-semibold text-text-primary mb-1">Popularity</h5>
                  <p className={`font-caption ${getPopularityColor(showTemplateDetails.popularity)}`}>
                    {showTemplateDetails.popularity}% of users
                  </p>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-heading font-semibold text-text-primary mb-3">Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {showTemplateDetails.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Icon name="Check" size={16} color="var(--color-success)" />
                      <span className="text-sm text-text-secondary font-caption">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t civic-border">
                <Button
                  variant="outline"
                  onClick={() => setShowTemplateDetails(null)}
                >
                  Close
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleTemplateUse(showTemplateDetails)}
                  iconName="Download"
                  iconPosition="left"
                >
                  Use This Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateLibrary;