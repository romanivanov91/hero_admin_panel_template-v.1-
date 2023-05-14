import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//Теперь createSelector уже не нужен, так как он используется внутри heroesSlice и функция filteredHeroesSelector создается в нем
// import { createSelector } from 'reselect';

//Теперь fetchHeroes импортируем из heroesSlice
//import { fetchHeroes} from '../../actions';
import { heroDeleted, fetchHeroes, filteredHeroesSelector } from './heroesSlice'

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './HeroesList.css'

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    //Эта функция для удобства переместилась в heroesSlice
    // const filteredHeroesSelector = createSelector(
    //     (state) => state.filters.activeFilterName,
    //     selectAll,
    //     //Вместо нижней закоментированной функции используем selectAll у функции createEntityAdapter
    //     // (state) => state.heroes.heroes,
    //     (filter, heroes) => {
    //         if (filter === 'all') {
    //                     return heroes
    //                 } else {
    //                     return heroes.filter(item => item.element === filter)
    //                 }
    //     }

    const filteredHeroes = useSelector(filteredHeroesSelector)
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const activeFilterName = useSelector(state => state.activeFilterName);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    // Функция берет id и по нему удаляет ненужного персонажа из store
    // ТОЛЬКО если запрос на удаление прошел успешно
    // Отслеживайте цепочку действий actions => reducers
    // const deleteHeroes = useCallback((id) => {
    //         request(`http://localhost:3001/heroes/${id}`, 'DELETE')
    //         .then(data => console.log(data, 'DELETED'))
    //         .then(dispatch(heroDeleted(id)))
    //         .catch(err => console.log(err))
    //         // eslint-disable-next-line  
    // }, [request]);

    //Метод удаления героя по клику на крестик, почему-то верхний не работает...
    const deleteHeroes = (id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(dispatch(heroDeleted(id)))
        .then(() => console.log(filteredHeroes))
        .catch(err => console.log(err))
    };

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            
            return (
            <CSSTransition timeout={1000} classNames="hero">
                <h5 className="text-center mt-5">Героев пока нет</h5>
            </CSSTransition>)
        }

        return arr.map(({id, ...props}) => {
            //Условие фильтрации исходя из наличия глобального state activFilterName
            if (activeFilterName) {
                if (props.element === activeFilterName || activeFilterName === 'all') {
                        return (
                            <CSSTransition key={id} timeout={500} classNames="hero">
                                <HeroesListItem {...props} deleteHeroes={() => deleteHeroes(id)}/>
                            </CSSTransition>
                        )
                } else {
                    return;
                }
            }  else {
                return (
                    <CSSTransition key={id} timeout={500} classNames="hero">
                        <HeroesListItem {...props} deleteHeroes={() => deleteHeroes(id)}/>
                    </CSSTransition>
                )
            }
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            <TransitionGroup component={null}> 
                {elements}
            </TransitionGroup>
        </ul>
    )
}

export default HeroesList;