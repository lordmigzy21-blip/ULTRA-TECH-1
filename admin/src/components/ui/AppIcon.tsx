import React from 'react';
import * as Icons from 'lucide-react';

interface AppIconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function AppIcon({ name, size = 20, className }: AppIconProps) {
  const iconMap: Record<string, keyof typeof Icons> = {
    CheckCircleIcon: 'CheckCircle',
    ExclamationCircleIcon: 'AlertTriangle',
    PlusIcon: 'Plus',
    XMarkIcon: 'X',
    TrashIcon: 'Trash2',
    PencilIcon: 'Edit2',
    PhoneIcon: 'Phone',
    CheckIcon: 'Check',
    ArrowUturnLeftIcon: 'RotateCcw',
    CalendarDaysIcon: 'Calendar',
    CalendarIcon: 'Calendar',
    HomeIcon: 'Home',
    ShoppingBagIcon: 'ShoppingBag',
    WrenchIcon: 'Wrench',
    ShieldCheckIcon: 'ShieldAlert',
    UserIcon: 'User',
    SettingsIcon: 'Settings',
    LogoutIcon: 'LogOut',
    DollarSignIcon: 'DollarSign',
    TrendingUpIcon: 'TrendingUp',
    PackageIcon: 'Package',
    FileTextIcon: 'FileText',
    PrinterIcon: 'Printer',
    SearchIcon: 'Search',
    ChevronRightIcon: 'ChevronRight',
    MenuIcon: 'Menu',
    InfoIcon: 'Info',
    MailIcon: 'Mail',
    MapPinIcon: 'MapPin',
    FacebookIcon: 'Facebook',
    InstagramIcon: 'Instagram',
    PhotoIcon: 'Image',
    UploadIcon: 'Upload'
  };

  const lucideName = iconMap[name] || name;
  const LucideIcon = (Icons as any)[lucideName] || Icons.HelpCircle;

  return <LucideIcon size={size} className={className} />;
}
