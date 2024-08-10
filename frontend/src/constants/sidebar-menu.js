import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: DashboardIcon,
        path: '/vehicle',
        title: 'Vehicle',
    },
    {
        id: 3,
        icon: ProductIcon,
        path: '/reports',
        title: 'Reports',
    },
    {
        id: 4,
        icon: ShippingIcon,
        path: '/tire-inspection',
        title: 'Tire Inspection',
    },
    {
        id: 5,
        icon: UserIcon,
        path: '/battery-inspection',
        title: 'Battery Inspection',
    },
    {
        id: 6,
        icon: UserIcon,
        path: '/exterior-inspection',
        title: 'Exterior Inspection',
    },
    {
        id: 7,
        icon: UserIcon,
        path: '/brake-inspection',
        title: 'Brake Inspection',
    },
    {
        id: 8,
        icon: UserIcon,
        path: '/engine-inspection',
        title: 'Engine Inspection',
    }
]

export default sidebar_menu;