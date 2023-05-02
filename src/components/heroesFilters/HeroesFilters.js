
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHttp} from '../../hooks/http.hook';

import { fetchFilters} from '../../actions'
import { activeFilterChanged} from './filtersSlice'

import Spinner from '../spinner/Spinner';
import classNames from 'classnames';//Библиотека для добавления класса активности)


const HeroesFilters = () => {

    const {filters, filtersLoadingStatus, activeFilterName} = useSelector(state=>state.filters)
    const dispatch = useDispatch();
    const {request} = useHttp();
    
    useEffect(() => {
        dispatch(fetchFilters(request));
    }, []);

    
    if (filtersLoadingStatus === 'loading') {
        return <Spinner/>
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        } 
       
        return arr.map((el,i)  => {
           
            //Здесь используется библиотека classNames, которая добавляет класс активности элементу если его имя равно activFilterName из state
            const btnClass = classNames('btn', el.className, {
                'active': el.name === activeFilterName
            });

            //Это условие проверяет соответствует ли имя фильтра activFilterName из state. Если да, то добавлет класс активности. Все нормально рабоает. Можно применить или этот вариант или вариант выше с библеотекой classNames
            //const btnClass = el.name === activFilterName ? `btn ${el.className} active`: `btn ${el.className}`;

            return <button 
                    key={i} 
                    className={btnClass}
                    onClick={() => dispatch(activeFilterChanged(el.name))}>
                        {el.label}
                    </button>
            })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderFilters(filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;