import { HomeIcon, ShoppingBagIcon, WrenchIcon, BookOpenIcon, PhoneIcon } from "lucide-react";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Services from "./pages/Services.jsx";
import Workshop from "./pages/Workshop.jsx";
import Contact from "./pages/Contact.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Home />,
  },
  {
    title: "Shop",
    to: "/shop",
    icon: <ShoppingBagIcon className="h-4 w-4" />,
    page: <Shop />,
  },
  {
    title: "Services",
    to: "/services",
    icon: <WrenchIcon className="h-4 w-4" />,
    page: <Services />,
  },
  {
    title: "Workshop",
    to: "/workshop",
    icon: <BookOpenIcon className="h-4 w-4" />,
    page: <Workshop />,
  },
  {
    title: "Contact",
    to: "/contact",
    icon: <PhoneIcon className="h-4 w-4" />,
    page: <Contact />,
  },
];