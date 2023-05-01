import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import filters from '../reducers/filters';
import heroes from '../reducers/heroes';

//Redux-thunk - это какая-то функция, которая берёт текущий store, текущий action и что-то делает с этим. Более подробно лучше прочитать в документации.Redux-thunk — это как раз такая функция, которая, что-то делает со store.

//Функция stringMiddleware преобразовывает action в объект, если в него пришла строка. Тоже что и делает закоментированная ниже функция enhancer, только использует готовый код
const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

//Функция enhancer преобразовывает action в объект, если в него пришла строка
// const enhancer = (createStore) => (...args) => {

//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;

//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action)
//     }

//     return store
// }

//combineReducers нужен для того чтобы скомбинировать 2 отдельных редьюсера. Вместо filters: filters можно написать просто filters
//compose нужен чтобы скомбинировать enhancer или Middleware с DEVTOOLS
const store = createStore(
    combineReducers({filters: filters, heroes: heroes}), 
    compose(
        applyMiddleware(ReduxThunk, stringMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));


//Использование enhancer
// const store = createStore(
//     combineReducers({filters: filters, heroes: heroes}), 
//     compose(
//         enhancer,
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     ));

export default store;