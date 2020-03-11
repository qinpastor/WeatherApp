/**
 *
 * Asynchronously loads the component for WeatherDataComponent
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
