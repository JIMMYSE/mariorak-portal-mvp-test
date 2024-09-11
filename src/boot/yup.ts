import { boot } from 'quasar/wrappers';
import configYup from './config-yup';

export default boot(() => {
  console.log('>>>boot');
  configYup();
});
