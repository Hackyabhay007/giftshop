import home_1 from '@assets/img/menu/menu-home-1.jpg';
import home_2 from '@assets/img/menu/menu-home-2.jpg';
import home_3 from '@assets/img/menu/menu-home-3.jpg';
import home_4 from '@assets/img/menu/menu-home-4.jpg';

const menu_data = [
  {
    id: 1,
    single_link: true,
    homes: true,
    title: 'Home',
    link: '/',
  
  },
  {
    id: 2,
    single_link: true,
    products: true,
    title: 'Products',
    link: '/shop',
   
  },
 
  {
    id: 4,
    single_link: true,
    title: 'Coupons',
    link: '/coupon',
  },
  {
    id: 5,
    sub_menu: true,
    title: 'Blog',
    link: '/blog',
   
  },
  // {
  //   id: 6,
  //   single_link: true,
  //   title: 'About Us',
  //   link: '/aboutus',
  // },
  // {
  //   id: 7,
  //   single_link: true,
  //   title: 'Contact Us',
  //   link: '/contactus',
  // },
  {
    id: 7,
    single_link: true,
    title: 'Install App',
    link: '/AppInstallPage',
  },
]

export default menu_data;

// mobile_menu
export const mobile_menu = [
  {
    id: 1,
    single_link: true,
    homes: true,
    title: 'Home',
    link: '/',
  
  },
  {
    id: 2,
    single_link: true,
    sub_menu: true,
    title: 'All Products',
    link: '/shop',
   
  },
  {
    id: 7,
    single_link: true,
    title: 'Coupons',
    link: '/coupon',
  },
  {
    id: 8,
    sub_menu: true,
    title: 'Blog',
    link: '/blog',
   
  },
 
  {
    id: 10,
    single_link: true,
    title: 'Contact Us',
    link: '/contactus',
  },
  {
    id: 7,
    single_link: true,
    title: 'Install App',
    link: '/AppInstallPage',
  },
]