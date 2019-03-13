export default {
  items: [{
      name: 'Dashboard',
      url: '/home/dashboard',
      icon: 'cui-calendar',
    },
    {
      name: 'Work registration',
      url: '/home/timeregistration/registration',
      icon: 'cui-calendar',
    },
    {
      name: 'Overview',
      icon: 'icon-puzzle',
      children: [{
          name: 'My work registrations',
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
