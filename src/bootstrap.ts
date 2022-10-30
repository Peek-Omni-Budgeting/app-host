import { registerApplication, start } from 'single-spa';
import { applications } from './config';
import { mergeCustomProps } from './utils/helpers';

applications.map(({
 name, activeWhen, customProps, ...rest
}: any) => registerApplication({
  name,
  activeWhen,
  customProps: mergeCustomProps(customProps),
  ...rest,
}));

start();
