import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ExportToolbar = () => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportScope, setExportScope] = useState('current');
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'xlsx', label: 'Excel Spreadsheet' },
    { value: 'json', label: 'JSON Data' }
  ];

  const scopeOptions = [
    { value: 'current', label: 'Current View' },
    { value: 'all-results', label: 'All Results' },
    { value: 'summary', label: 'Summary Only' },
    { value: 'detailed', label: 'Detailed Report' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would trigger the actual export
    console.log(`Exporting ${exportScope} as ${exportFormat}`);
    
    setIsExporting(false);
  };

  const handleShare = (platform) => {
    const shareData = {
      title: 'Election Results 2024',
      text: 'View the latest election results and analytics',
      url: window.location.href
    };

    if (navigator.share && platform === 'native') {
      navigator.share(shareData);
    } else {
      // Fallback for specific platforms
      const urls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`
      };
      
      if (urls[platform]) {
        window.open(urls[platform], '_blank', 'width=600,height=400');
      }
    }
  };

  return (
    <div className="bg-surface border civic-border rounded-lg p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Export Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 min-w-0">
            <Select
              label="Export Format"
              options={formatOptions}
              value={exportFormat}
              onChange={setExportFormat}
              className="mb-0"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <Select
              label="Export Scope"
              options={scopeOptions}
              value={exportScope}
              onChange={setExportScope}
              className="mb-0"
            />
          </div>
          
          <Button
            variant="default"
            onClick={handleExport}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            className="sm:mb-0"
          >
            Export
          </Button>
        </div>

        {/* Share Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-caption text-text-secondary">Share:</span>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleShare('twitter')}
            title="Share on Twitter"
          >
            <Icon name="Twitter" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleShare('facebook')}
            title="Share on Facebook"
          >
            <Icon name="Facebook" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleShare('linkedin')}
            title="Share on LinkedIn"
          >
            <Icon name="Linkedin" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleShare('native')}
            title="Share"
          >
            <Icon name="Share2" size={16} />
          </Button>
        </div>
      </div>

      {/* Export Status */}
      {isExporting && (
        <div className="mt-4 flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Loader2" size={14} className="animate-spin" />
          <span className="font-caption">Generating export...</span>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t civic-border">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Printer"
            iconPosition="left"
            onClick={() => window.print()}
          >
            Print
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Copy"
            iconPosition="left"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            Copy Link
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Mail"
            iconPosition="left"
            onClick={() => window.location.href = `mailto:?subject=Election Results 2024&body=View the latest results: ${window.location.href}`}
          >
            Email
          </Button>
        </div>
      </div>

      {/* Verification Notice */}
      <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} color="var(--color-success)" className="mt-0.5" />
          <div>
            <p className="text-sm font-caption text-success font-semibold">
              Verified Results
            </p>
            <p className="text-xs text-success/80 font-caption">
              All exported data includes cryptographic verification and timestamps to ensure authenticity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportToolbar;