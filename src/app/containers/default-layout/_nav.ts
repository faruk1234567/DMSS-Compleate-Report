import { INavData } from '@coreui/angular';

export const navItems: INavData[] =
 [
  {
    name: 'Water Bill Reports',
    url: '/report/wb',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Water Bill Demand',
        url: '/report/wb/wb-demand'
      },
      {
        name: 'WB  Online Collection',
        url: '/report/wb/wb-recovery'
      },
      {
        name: 'WB Offline Collection',
        url: '/report/wb/wb-offline-recovery'
      },
    ]
  },


  {
    name: 'Tread License Reports',
    url: '/report/tls',
    iconComponent: { name: 'cil-cursor' },
    children: [
      /* {
        name: 'TLS Collection',
        url: '/report/tls/tls-collection'
      },
      {
        name: 'TLS Collection - Detail',
        url: '/report/tls/tls-recover-detail'
      }, */
      /* {
        name: 'TLS Demand',
        url: '/report/tls/tls-demand'
      }, */
      {
        name: 'Daily Transaction',
        url: '/report/tls/tls-daily-report'
      },
      {
        name: 'TradeLicense Demand',
        url: '/report/tls/tls-municipality-demand'
      },
      {
        name: 'TradeLicense Renewal List',
        url: '/report/tls/tls-renewal-report'
      },
    ]
  },
  {
    name: 'Property Lease Reports',
    url: '/report/propertybill',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Property Lease Demand',
        url: '/report/propertybill/pb-demand'
      },
      {
        name: 'Property Lease Recovery',
        url: '/report/propertybill/pb-recovery'
      },
      {
        name: 'Property OfflineRecovery',
        url: '/report/propertybill/pb-offline-recovery'
      },
    ]
  },
  {
    name: 'Certificate Reports',
    url: '/report/CF',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Certificate Issue',
        url: '/report/CF/CF-Issue'
      },


    ]
  },
  {
    name: 'Holding Tax Reports',
    //url: '/report/HTAX',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'HTAX  OnlineCollection',
        //url: '/report/HTAX/ht-online-collection',
        children: [   // এখানে সাবমেনু যোগ করলাম
      {
        name: 'Daily Collection',
        url: '/report/HTAX/ht-daily-report'
      },
      {
        name: 'Word Wise Collection ',
        url: '/report/HTAX/ht-word-wise-report'
      }
    ]
      },
      {
        name: 'HTAX Offline Collection',
        url: '/report/HTAX/ht-offline-collection'
      },

      {
        name: 'HTAX Demand',
        url: '/report/HTAX/ht-demand'
      },


    ]
  },

];

/*export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Components',
    title: true
  },
  {
    name: 'Base',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Accordion',
        url: '/base/accordion'
      },
      {
        name: 'Breadcrumbs',
        url: '/base/breadcrumbs'
      },
      {
        name: 'Cards',
        url: '/base/cards'
      },
      {
        name: 'Carousel',
        url: '/base/carousel'
      },
      {
        name: 'Collapse',
        url: '/base/collapse'
      },
      {
        name: 'List Group',
        url: '/base/list-group'
      },
      {
        name: 'Navs & Tabs',
        url: '/base/navs'
      },
      {
        name: 'Pagination',
        url: '/base/pagination'
      },
      {
        name: 'Placeholder',
        url: '/base/placeholder'
      },
      {
        name: 'Popovers',
        url: '/base/popovers'
      },
      {
        name: 'Progress',
        url: '/base/progress'
      },
      {
        name: 'Spinners',
        url: '/base/spinners'
      },
      {
        name: 'Tables',
        url: '/base/tables'
      },
      {
        name: 'Tabs',
        url: '/base/tabs'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/buttons',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons'
      },
      {
        name: 'Button groups',
        url: '/buttons/button-groups'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns'
      },
    ]
  },
  {
    name: 'Forms',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Form Control',
        url: '/forms/form-control'
      },
      {
        name: 'Select',
        url: '/forms/select'
      },
      {
        name: 'Checks & Radios',
        url: '/forms/checks-radios'
      },
      {
        name: 'Range',
        url: '/forms/range'
      },
      {
        name: 'Input Group',
        url: '/forms/input-group'
      },
      {
        name: 'Floating Labels',
        url: '/forms/floating-labels'
      },
      {
        name: 'Layout',
        url: '/forms/layout'
      },
      {
        name: 'Validation',
        url: '/forms/validation'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    iconComponent: { name: 'cil-chart-pie' }
  },
  {
    name: 'Icons',
    iconComponent: { name: 'cil-star' },
    url: '/icons',
    children: [
      {
        name: 'CoreUI Free',
        url: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'CoreUI Flags',
        url: '/icons/flags'
      },
      {
        name: 'CoreUI Brands',
        url: '/icons/brands'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    iconComponent: { name: 'cil-bell' },
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts'
      },
      {
        name: 'Badges',
        url: '/notifications/badges'
      },
      {
        name: 'Modal',
        url: '/notifications/modal'
      },
      {
        name: 'Toast',
        url: '/notifications/toasts'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    iconComponent: { name: 'cil-calculator' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login'
      },
      {
        name: 'Register',
        url: '/register'
      },
      {
        name: 'Error 404',
        url: '/404'
      },
      {
        name: 'Error 500',
        url: '/500'
      }
    ]
  },
];*/
