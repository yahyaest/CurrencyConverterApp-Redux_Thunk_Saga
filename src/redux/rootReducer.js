import { combineReducers } from "redux";

import conversions from "./conversions";
import currencies from "./currencies";

export default combineReducers({ conversions,currencies });
