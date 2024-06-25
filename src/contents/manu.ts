
// type SIDE_BAR_MENU_PROPS = {
//   label: string;
//   path: string;
// };
import CalIcon from '@/icons/cal-icon';
import ChatIcon from '@/icons/chat-icon';
import DashboardIcon from '@/icons/dashboard-icon';
import EmailIcon from '@/icons/email-icon';
import HelpDeskIcon from '@/icons/help-desk-icon';
import IntegrationsIcon from '@/icons/integrations-icon';
import SettingsIcon from '@/icons/settings-icon';
import StarIcon from '@/icons/star-icon';
import TimerIcon from '@/icons/timer-icon';

// Define the props for the side bar menu
type SIDE_BAR_MENU_PROPS = {
  label: string;
  icon: React.ComponentType;
  path: string;
};

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    label: 'Dashboard',
    icon: DashboardIcon,
    path: 'dashboard',
  },
  {
    label: 'Conversations',
    icon: ChatIcon,
    path: 'conversation',
  },
  {
    label: 'Integrations',
    icon: IntegrationsIcon,
    path: 'integration',
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    path: 'settings',
  },
  {
    label: 'Appointments',
    icon: CalIcon,
    path: 'appointment',
  },
  {
    label: 'Email Marketing',
    icon: EmailIcon,
    path: 'email-marketing',
  },
];
type TABS_MENU_PROPS = {
  label: string
}

export const TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'unread',
  },
  {
    label: 'all',
  },
  {
    label: 'expired',
  },
  {
    label: 'starred',
  },
]

export const HELP_DESK_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'help desk',
  },
  {
    label: 'questions',
  },
]

export const APPOINTMENT_TABLE_HEADER = [
  'Name',
  'RequestedTime',
  'Added Time',
  'Domain',
]

export const EMAIL_MARKETING_HEADER = ['Id', 'Email', 'Answers', 'Domain']

export const BOT_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'chat',
  },
  {
    label: 'helpdesk',
  },
]
