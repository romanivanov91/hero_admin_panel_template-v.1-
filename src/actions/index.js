//Action теперь берутся не отсюда, а из файлов heroesSlice и filtersSlice где обьеденены и action и reduser
// import { heroesFetching, heroesFetched, heroesFetchingError} from '../components/heroesList/heroesSlice';
// import { filtersFetching, filtersFetched, filtersFetchedError} from '../components/heroesFilters/filtersSlice'

// Теперь делаем fetchHeroes и fetchFilters в файле heroesSlice и filtersSlice сответстенно с помощью  createAsyncThunk (Описание там оставил)
//сразу делаем запрос на сервер и тут же диспетчим в стор. Нужен Redux-thunk - как я понял позволяет передать в action функцию
// export const fetchHeroes = (request) => (dispatch) => {
//     dispatch(heroesFetching);
//     request("http://localhost:3001/heroes")
//     .then(data => dispatch(heroesFetched(data)))
//     .catch(() => dispatch(heroesFetchingError()))
// }

// export const fetchFilters = (request) => (dispatch) => {
//     dispatch(filtersFetching());
//     request('http://localhost:3001/filters')
//     .then(res => dispatch(filtersFetched(res)))
//     .catch(() => dispatch(filtersFetchedError()));
// }

//То что закоментировано уже не нужно. так как все action и reducer создаются в файлах heroesSlice и filtersSlice с помощью createSlice
// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters
//     }
// }

// export const filtersFetchedError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

// export const activeFilterChanged = (filter) => {
//     return {
//         type: 'ACTIVE_FILTER_CHANGED',
//         payload: filter
//     }
// }

//Пример с задержкой применения фильтра
// export const activeFilterChanged = (filter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: 'ACTIVE_FILTER_CHANGED',
//             payload: filter
//         })
//     }, 1000)
// }

// export const heroCreated = (hero) => {
//     return {
//         type: 'HERO_CREATED',
//         payload: hero
//     }
// }

// export const heroDeleted = (id) => {
//     return {
//         type: 'HERO_DELETED',
//         payload: id
//     }
// }