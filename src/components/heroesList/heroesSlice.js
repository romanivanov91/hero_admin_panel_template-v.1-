import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
//createSlice — объединяет в себе функционал createAction и createReducer
// createReducer(): позволяет использовать таблицу поиска (lookup table) операций для редукторов случая (case reducers) вместо инструкций switch. В данном API используется библиотека immer, позволяющая напрямую изменять иммутабельный код, например, так: state.todos[3].completed = true
// createAction(): генерирует создателя операции (action creator) для переданного типа операции. Функция имеет переопределенный метод toString(), что позволяет использовать ее вместо константы типа
// CreateAsyncThunk() — данный метод предназначен для выполнения асинхронных операций: он принимает тип операции и функцию, возвращающую промис, и генерирует преобразователь операции (thunk), который, в свою очередь, отправляет типы операций pending/fulfilled/rejected в частичный редуктор.
import {useHttp} from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

//Старый initialState, теперь его создаем с помощью createEntityAdapter
// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
});


export const fetchHeroes = createAsyncThunk(
    //Тип операции
    'heroes/fetchHeroes',
    //Функция возвращающая промис
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes");
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        // heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        // heroesFetched: (state, action) => {
        //     state.heroesLoadingStatus = 'idle';
        //     state.heroes = action.payload;
        // },
        // heroesFetchingError: state => {
        //     state.heroesLoadingStatus = 'error';
        // },
        heroCreated: (state, action) => {
            //используем метод addOne у функции createEntityAdapter для добавления одного нового персонажа
            heroesAdapter.addOne(state, action.payload);
            //state.heroes.push(action.payload);
        },
        heroDeleted: (state, action) => {
            //используем метод removeOne у функции createEntityAdapter для удаления одного персонажа
            heroesAdapter.removeOne(state, action.payload);
            // state.heroes = state.heroes.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                //используем метод setAll у функции createEntityAdapter для начального добавления всех персонажей с сервера
                heroesAdapter.setAll(state, action.payload);
                // state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;

//Метод getSelect преобразует объект state (createEntityAdapter хранит данные в виде объекта) в массив
const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);

export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilterName,
    selectAll,
    //Вместо нижней закоментированной функции используем selectAll у функции createEntityAdapter
    // (state) => state.heroes.heroes,
    (filter, heroes) => {
        if (filter === 'all') {
                    return heroes
                } else {
                    return heroes.filter(item => item.element === filter)
                }
    }
);

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions; 