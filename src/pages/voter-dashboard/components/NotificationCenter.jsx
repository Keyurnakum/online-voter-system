import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter(n => !n.read).length
  );

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'election-start':
        return 'Play';
      case 'election-reminder':
        return 'Bell';
      case 'election-closing':
        return 'Clock';
      case 'results-available':
        return 'BarChart3';
      case 'system-update':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'error';
    switch (type) {
      case 'election-start':
        return 'success';
      case 'election-reminder':
        return 'warning';
      case 'election-closing':
        return 'error';
      case 'results-available':
        return 'primary';
      case 'system-update':
        return 'secondary';
      default:
        return 'muted';
    }
  };

  const markAsRead = (notificationId) => {
    // In a real app, this would update the backend
    console.log('Marking notification as read:', notificationId);
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    // In a real app, this would update the backend
    console.log('Marking all notifications as read');
    setUnreadCount(0);
  };

  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="bg-card border civic-border rounded-lg civic-shadow-sm">
      {/* Header */}
      <div className="p-4 border-b civic-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} color="var(--color-primary)" />
            <h3 className="font-heading font-semibold text-text-primary">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-caption">
                {unreadCount}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>
      </div>

      {/* Notification List */}
      <div className="p-4">
        {recentNotifications.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={32} color="var(--color-text-secondary)" className="mx-auto mb-2 opacity-50" />
            <p className="text-sm font-caption text-text-secondary">
              No new notifications
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {(isExpanded ? notifications : recentNotifications).map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-3 p-3 rounded-md civic-transition hover:bg-muted/50 ${
                  !notification.read ? 'bg-primary/5 border border-primary/20' : ''
                }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-${getNotificationColor(notification.type, notification.priority)}/10 flex-shrink-0`}>
                  <Icon 
                    name={getNotificationIcon(notification.type)} 
                    size={14} 
                    color={`var(--color-${getNotificationColor(notification.type, notification.priority)})`}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-body font-semibold text-text-primary text-sm">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-text-secondary font-caption mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs font-caption text-text-secondary">
                          {new Date(notification.timestamp).toLocaleDateString()} at {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {notification.priority === 'high' && (
                          <span className="text-xs px-2 py-1 rounded-full font-caption bg-error/10 text-error">
                            HIGH PRIORITY
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="ml-2"
                      >
                        <Icon name="Check" size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="mt-4 pt-4 border-t civic-border">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={markAllAsRead}
              iconName="CheckCheck"
              iconPosition="left"
            >
              Mark All as Read
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;