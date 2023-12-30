import {
  mdiLogout,
  mdiThemeLightDark,
  mdiLogin
} from '@mdi/js'

export default [
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true
  },
  {
    icon: mdiLogin,
    label: 'Login',
    isToggleLogin: true
  },
  {
    isCurrentUser: true,
    label: 'AuthenticatedUser',
    menu: [
      {
        icon: mdiLogout,
        label: 'Log Out',
        isLogout: true
      }
    ]
  },
]
