import { createMarkerGroup } from './map.js';
import { getAdverts } from './data.js';
const ads = getAdverts();
createMarkerGroup(ads);
