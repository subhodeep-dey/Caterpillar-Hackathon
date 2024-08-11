import DashboardIcon from "../assets/icons/dashboard.svg";
import ShippingIcon from "../assets/icons/inspection.svg";
import ProductIcon from "../assets/icons/reports.svg";
import VehicleIcon from "../assets/icons/vehicle.svg";
import UserIcon from "../assets/icons/user.svg";

const sidebar_menu = [
  {
    id: 1,
    icon: DashboardIcon,
    path: "/",
    title: "Dashboard",
  },
  {
    id: 2,
    icon: ProductIcon,
    path: "/reports",
    title: "Reports",
  },
  {
    id: 3,
    icon: ShippingIcon,
    path: "/tire-inspection",
    title: "Tire Inspection",
  },
  {
    id: 4,
    icon: ShippingIcon,
    path: "/battery-inspection",
    title: "Battery Inspection",
  },
  {
    id: 5,
    icon: ShippingIcon,
    path: "/exterior-inspection",
    title: "Exterior Inspection",
  },
  {
    id: 6,
    icon: ShippingIcon,
    path: "/brake-inspection",
    title: "Brake Inspection",
  },
  {
    id: 7,
    icon: ShippingIcon,
    path: "/engine-inspection",
    title: "Engine Inspection",
  },
  {
    id: 8,
    icon: VehicleIcon,
    path: "/vehicle",
    title: "Vehicle",
  },
];

export default sidebar_menu;
