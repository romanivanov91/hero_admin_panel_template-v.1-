//Нижние закоментированные импорты теперь не нужны, так как используется Redux Toolkit - в нем уже все это импортируется по умолчанию
// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import ReduxThunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/filtersSlice';
import heroes from '../components/heroesList/heroesSlice';

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
// const store = createStore(
//     combineReducers({filters: filters, heroes: heroes}), 
//     compose(
//         applyMiddleware(ReduxThunk, stringMiddleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     ));


//Использование enhancer
// const store = createStore(
//     combineReducers({filters: filters, heroes: heroes}), 
//     compose(
//         enhancer,
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     ));

const store = configureStore({
    reducer: {heroes, filters},//комбинируем редьюсеры
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),//используем мидлвейеры по умолчанию плюс добавляем свой stringMiddleware. В getDefaultMiddleware уже включен ReduxThunk и еще другие про которые можно почитать в документации
    devTools: process.env.NODE_ENV !== 'production'//включаем REDUX_DEVTOOLS только если у нас режим разработки
})

export default store;