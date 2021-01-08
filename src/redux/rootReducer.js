import { combineReducers } from "redux";

import admin from "../admin/js/redux/admin"
import conversions from "./conversions";
import currencies from "./currencies";

export default combineReducers({admin, conversions,currencies });
