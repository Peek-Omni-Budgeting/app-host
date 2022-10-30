export const applications: any = [{
  name: 'nav',
  app: () => import('appNav'),
  activeWhen: ['/'],
}];