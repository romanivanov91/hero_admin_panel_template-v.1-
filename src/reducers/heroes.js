//Файл не используется, так как все action и reducer создаются в файлах heroesSlice и filtersSlice с помощью createSlice

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroes = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_CREATED':
            let newCreatedHeroList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newCreatedHeroList
            }
        case 'HERO_DELETED':
            return {
                ...state,
                heroes: state.heroes.filter(el => el.id !== action.payload)
                }
        default: return state
    }
}

export default heroes;