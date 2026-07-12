import { BellRing, DoorOpen, LayoutDashboard, Package, Settings2, ShieldUser, UsersRound } from 'lucide-react';

export type NavRoute = {
  title: string;
  url: string;
  icon: React.ElementType;
  isActive: boolean;
  items?: Omit<NavRoute, 'items' | 'icon'>[];
};

const navRoutes: NavRoute[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: 'Overview',
        url: '/dashboard/overview',
        isActive: true,
      },
      {
        title: 'Stats',
        url: '/dashboard/stats',
        isActive: false,
      },
    ],
  },
  {
    title: 'Users',
    url: '/users',
    icon: ShieldUser,
    isActive: true,
  },
  {
    title: 'Teachers',
    url: '/teachers',
    icon: UsersRound,
    isActive: true,
  },
  {
    title: 'Classroom',
    url: '/classrooms',
    icon: DoorOpen,
    isActive: true,
  },
  {
    title: 'Products',
    url: '/products',
    icon: Package,
    isActive: true,
  },
  {
    title: 'Notification',
    url: '/notification',
    icon: BellRing,
    isActive: true,
  },
  {
    title: 'Products2',
    url: '/products2',
    icon: Package,
    isActive: true,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings2,
    isActive: true,
    items: [
      {
        title: 'Profile',
        url: '/settings/profile',
        isActive: true,
      },
    ],
  },
];

export default navRoutes;
