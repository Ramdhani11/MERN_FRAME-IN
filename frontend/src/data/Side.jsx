import home from "../assets/svg/home_FILL0_wght400_GRAD0_opsz48.svg";
import homeFill from "../assets/svg/home_FILL1_wght400_GRAD0_opsz48.svg";
import add from "../assets/svg/add_box_FILL0_wght400_GRAD0_opsz48.svg";
import addFill from "../assets/svg/add_box_FILL1_wght400_GRAD0_opsz48.svg";
import seacrh from "../assets/svg/search_FILL1_wght400_GRAD0_opsz48.svg";

export const Side = [
  {
    path: "/Home",
    icon: home,
    activeIcon: homeFill,
    name: "Home",
  },
  {
    path: "/Create",
    icon: add,
    activeIcon: addFill,
    name: "Create",
  },
  {
    path: "/Search",
    icon: seacrh,
    activeIcon: seacrh,
    name: "Search",
  },
  {
    path: "/Profile",
    icon: home,
    activeIcon: homeFill,
    name: "Profile",
  },
];
