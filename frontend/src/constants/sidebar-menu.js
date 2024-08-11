import DashboardIcon from "../assets/icons/dashboard.svg";
import ShippingIcon from "../assets/icons/inspection.svg";
import ProductIcon from "../assets/icons/reports.svg";
import VehicleIcon from "../assets/icons/vehicle.svg";
import TireIcon from "../assets/icons/tire.svg";
import BatteryIcon from "../assets/icons/battery.svg";
import BrakeIcon from "../assets/icons/brake.svg";
import EngineIcon from "../assets/icons/engine.svg";
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
    icon: TireIcon,
    path: "/tire-inspection",
    title: "Tire Inspection",
  },
  {
    id: 4,
    icon: BatteryIcon,
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
    icon: BrakeIcon,
    path: "/brake-inspection",
    title: "Brake Inspection",
  },
  {
    id: 7,
    icon: EngineIcon,
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
