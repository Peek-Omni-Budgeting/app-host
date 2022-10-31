import { domElementGetter, activeWhenExact } from '@Utils';

export const applications: any = [
  {
    name: 'nav',
    app: () => import('appNav'),
    activeWhen: ['/'],
    customProps: {
      domElement: domElementGetter('pob-application:nav'),
    }
  },
  {
    name: 'appHome',
    app: () => import('appHome'),
    activeWhen: [activeWhenExact('/')],
  }
];