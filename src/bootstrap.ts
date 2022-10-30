import { registerApplication, start } from 'single-spa';
import {applications} from './config';

applications.map(({
 name, activeWhen, ...rest
}: any) => registerApplication({
  name,
  activeWhen,
  ...rest,
}));

start();
