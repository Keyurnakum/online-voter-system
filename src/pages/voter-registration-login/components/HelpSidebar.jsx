import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HelpSidebar = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "Who is eligible to register?",
      answer: "U.S. citizens who are 18 years or older and residents of the voting jurisdiction are eligible to register. You must provide valid identification and proof of address."
    },
    {
      id: 2,
      question: "What documents do I need?",
      answer: "You'll need a government-issued photo ID (driver's license, passport, or state ID) and proof of current address. Documents must be clear and legible."
    },
    {
      id: 3,
      question: "How secure is online voting?",
      answer: "Our platform uses bank-level encryption, multi-factor authentication, and is certified by federal election authorities. All votes are encrypted and auditable."
    },
    {
      id: 4,
      question: "Can I change my vote?",
      answer: "Once submitted, votes cannot be changed. However, you can review your selections before final submission during the voting process."
    },
    {
      id: 5,
      question: "What if I forget my password?",
      answer: "Use the \'Forgot Password\' link on the login form. We\'ll send reset instructions to your registered email address."
    }
  ];

  const supportOptions = [
    {
      icon: 'Phone',
      title: 'Phone Support',
      description: '1-800-VOTE-HELP',
      availability: 'Mon-Fri 8AM-8PM EST'
    },
    {
      icon: 'Mail',
      title: 'Email Support',
      description: 'support@votesecure.gov',
      availability: 'Response within 24 hours'
    },
    {
      icon: 'MessageCircle',
      title: 'Live Chat',
      description: 'Chat with support agent',
      availability: 'Available during elections'
    }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Quick Help */}
      <div className="bg-surface p-6 rounded-lg civic-shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="HelpCircle" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-primary">Need Help?</h3>
        </div>
        
        <p className="text-sm font-caption text-text-secondary mb-4">
          Get assistance with voter registration, login issues, or technical support.
        </p>
        
        <div className="space-y-3">
          {supportOptions.map((option, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-md">
              <Icon name={option.icon} size={16} color="var(--color-primary)" />
              <div className="flex-1">
                <div className="font-body font-semibold text-sm text-text-primary">
                  {option.title}
                </div>
                <div className="text-sm font-caption text-text-primary">
                  {option.description}
                </div>
                <div className="text-xs font-caption text-text-secondary">
                  {option.availability}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-surface p-6 rounded-lg civic-shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-primary">Frequently Asked Questions</h3>
        </div>
        
        <div className="space-y-2">
          {faqs.map((faq) => (
            <div key={faq.id} className="border civic-border rounded-md">
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/50 civic-transition"
              >
                <span className="font-body font-medium text-sm text-text-primary">
                  {faq.question}
                </span>
                <Icon 
                  name={expandedFaq === faq.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-secondary"
                />
              </button>
              
              {expandedFaq === faq.id && (
                <div className="px-4 pb-3 border-t civic-border">
                  <p className="text-sm font-caption text-text-secondary pt-3">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
          <h4 className="font-heading font-semibold text-sm text-warning">
            Election Day Emergency
          </h4>
        </div>
        <p className="text-xs font-caption text-text-secondary mb-3">
          For urgent technical issues during active elections
        </p>
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Phone"
          iconPosition="left"
        >
          Call Emergency Line
        </Button>
      </div>

      {/* System Status */}
      <div className="bg-success/10 border border-success/20 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <h4 className="font-heading font-semibold text-sm text-success">
            System Status: Operational
          </h4>
        </div>
        <p className="text-xs font-caption text-text-secondary">
          All systems running normally. Last checked: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default HelpSidebar;