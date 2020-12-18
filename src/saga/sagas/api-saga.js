import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import { conversionsLoaded } from "../reducers/conversions";
import {  currenciesLoaded }from "../reducers/currencies";

export default function* watcherSaga() {
  yield takeLatest("CONVERSIONS_REQUESTED", workerConversionsSaga);
  yield takeLatest("CURRENCIES_REQUESTED", workerCurrenciesSaga);
}

function* workerConversionsSaga() {
  try {
    const payload = yield call(getConversionsData);
    yield put({ type: `${conversionsLoaded}`, payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* workerCurrenciesSaga() {
  try {
    const payload = yield call(getCurrenciesData);
    yield put({ type: `${currenciesLoaded}`, payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

export function* rootSaga() {
  yield all([
    fork(watcherSaga),
  ]);
}

function getConversionsData() {
  return fetch("http://localhost:5000/conversions/").then((response) =>
    response.json()
  );
}

function getCurrenciesData() {
  return fetch("http://localhost:5000/currencies/").then((response) =>
    response.json()
  );
}
