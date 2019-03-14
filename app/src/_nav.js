export default {
  items: [{
      name: 'Dashboard',
      url: '/home/dashboard',
      icon: 'cui-chart',
    },
    {
      name: 'Time registration',
      url: '/home/timeregistration/registration',
      icon: 'fa fa-calendar',
    },
    {
      name: 'Overview',
      icon: 'icon-puzzle',
      children: [{
          name: 'My registrations',
          url: '/home/timeregistration/timeoverview',
          icon: 'cui-list',
        },
        {
          name: 'Analysis',
          url: '/home/invoice/report',
          icon: 'cui-file',
        }
      ]
    }
  ]
}
