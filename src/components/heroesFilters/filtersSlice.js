import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
//createSlice — объединяет в себе функционал createAction и createReducer
// createReducer(): позволяет использовать таблицу поиска (lookup table) операций для редукторов случая (case reducers) вместо инструкций switch. В данном API используется библиотека immer, позволяющая напрямую изменять иммутабельный код, например, так: state.todos[3].completed = true
// createAction(): генерирует создателя операции (action creator) для переданного типа операции. Функция имеет переопределенный метод toString(), что позволяет использовать ее вместо константы типа
// CreateAsyncThunk() — данный метод предназначен для выполнения асинхронных операций: он принимает тип операции и функцию, возвращающую промис, и генерирует преобразователь операции (thunk), который, в свою очередь, отправляет типы операций pending/fulfilled/rejected в частичный редуктор.
import {useHttp} from '../../hooks/http.hook';

const filtersAdapter = createEntityAdapter();


//Старый initialState, теперь его создаем с помощью createEntityAdapter
// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilterName: 'all'
// }

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilterName: 'all'
})

export const fetchFilters = createAsyncThunk(
    //Тип операции
    'filters/fetchFilters',
    //Функция возвращающая промис
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters");
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        // filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        // filtersFetched: (state, action) => {
        //     state.filtersLoadingStatus = 'idle';
        //     state.filters = action.payload;
        // },
        // filtersFetchedError: state => {state.filtersLoadingStatus = 'error'},
        activeFilterChanged: (state, action) => {state.activeFilterName = action.payload}
    },
    extraReducers: (builder) => {
        builder.
            addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload);
                //state.filters = action.payload;
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;

//Метод getSelect преобразует объект state (createEntityAdapter хранит данные в виде объекта) в массив
export const {selectAll} = filtersAdapter.getSelectors(state => state.filters)

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchedError,
    activeFilterChanged
} = actions;