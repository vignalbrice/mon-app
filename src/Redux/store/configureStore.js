// Store/configureStore.js
import { persistCombineReducers } from 'redux-persist'
import { createStore, applyMiddleware ,compose} from 'redux';
import reducers from '../reducers/reducers'
import thunkMiddleware  from 'redux-thunk';
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const rootPersistConfig = {
    key: 'users',
    storage: storage,
    stateReconciler: hardSet
  }
const Store = createStore(
persistCombineReducers(rootPersistConfig, {reducers}),
compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));
export default Store;