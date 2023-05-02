//Файл не используется, так как все action и reducer создаются в файлах heroesSlice и filtersSlice с помощью createSlice

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilterName: 'all'
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHED_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilterName: action.payload
                }
        default: return state
    }
}

export default filters;