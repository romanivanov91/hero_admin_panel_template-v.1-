import { createStore, combineReducers, compose } from 'redux';
import filters from '../reducers/filters';
import heroes from '../reducers/heroes';

//Функция enhancer преобразовывает action в объект, если в него пришла строка
const enhancer = (createStore) => (...args) => {

    const store = createStore(...args);

    const oldDispatch = store.dispatch;

    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch(action)
    }

    return store
}

//combineReducers нужен для того чтобы скомбинировать 2 отдельных редьюсера. Вместо filters: filters можно написать просто filters
//compose нужен чтобы скомбенировать enhancer с другой функцией, короче нужен
const store = createStore(
    combineReducers({filters: filters, heroes: heroes}), 
    compose(
        enhancer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

export default store;