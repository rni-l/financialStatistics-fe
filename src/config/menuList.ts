import { MenuItem } from '../../types/common';

export const menuList: MenuItem[] = [
  {
    label: 'first',
    index: '/empty',
    permission: 'home',
    icon: 'wtxicon-message',
    children: [
      {
        label: 'empty',
        icon: '',
        index: '/empty'
      }
    ]
  }
]
