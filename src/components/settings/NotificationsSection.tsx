
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NotificationSettings {
  email: boolean;
  desktop: boolean;
  mobile: boolean;
  updates: boolean;
  security: boolean;
}

interface NotificationsSectionProps {
  notifications: NotificationSettings;
  onNotificationsChange: (newSettings: NotificationSettings) => void;
}

export const NotificationsSection = ({
  notifications,
  onNotificationsChange,
}: NotificationsSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium dark:text-white">Notifications</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="emailNotif" className="dark:text-gray-200">Email Notifications</Label>
            <p className="text-sm text-muted-foreground dark:text-gray-400">Receive updates via email</p>
          </div>
          <Switch
            id="emailNotif"
            checked={notifications.email}
            onCheckedChange={(checked) => onNotificationsChange({ ...notifications, email: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="desktopNotif" className="dark:text-gray-200">Desktop Notifications</Label>
            <p className="text-sm text-muted-foreground dark:text-gray-400">Show desktop alerts</p>
          </div>
          <Switch
            id="desktopNotif"
            checked={notifications.desktop}
            onCheckedChange={(checked) => onNotificationsChange({ ...notifications, desktop: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="updateNotif" className="dark:text-gray-200">Update Notifications</Label>
            <p className="text-sm text-muted-foreground dark:text-gray-400">Get notified about new features</p>
          </div>
          <Switch
            id="updateNotif"
            checked={notifications.updates}
            onCheckedChange={(checked) => onNotificationsChange({ ...notifications, updates: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="securityNotif" className="dark:text-gray-200">Security Alerts</Label>
            <p className="text-sm text-muted-foreground dark:text-gray-400">Important security notifications</p>
          </div>
          <Switch
            id="securityNotif"
            checked={notifications.security}
            onCheckedChange={(checked) => onNotificationsChange({ ...notifications, security: checked })}
          />
        </div>
      </div>
    </div>
  );
};
