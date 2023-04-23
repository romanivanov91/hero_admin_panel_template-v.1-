// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {heroCreated} from '../../actions';
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from "../../hooks/http.hook";

const HeroesAddForm = () => {

    //Создаем состояния элементов формы, чтобы она была контролируемой
    const [heroName, setHeroName] = useState('');
    const [heroDesc, setHeroDesc] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const {filters, filtersLoadingStatus} = useSelector(state=>state.filters)
    const dispatch = useDispatch();
    const {request} = useHttp();

    const addHero = (e) => {
        e.preventDefault();
        const objectHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDesc,
            element: heroElement
        }
        //Вариант брать данные напрямую из формы
        // const formData = new FormData(e.target);
        // const objectHero = {
        //     id: uuidv4()
        // };
        // formData.forEach(function(value, key){
        //     objectHero[key] = value;
        // });
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(objectHero))
        .then(res => console.log(res, 'Отправка успешна'))
        .then(dispatch(heroCreated(objectHero)))
        .catch(error => console.log(error));
        //Очищаем форму после отправки
        setHeroName('');
        setHeroDesc('');
        setHeroElement('');
    }

    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <option>Загрузка элементов</option>
        } else if (status === 'error') {
            return <option>Ошибка загрузки</option>
        }

        if (filters) {
            return filters.map((el,i)  => {
                if (el.name === 'all') {
                    return;
                }
                return <option key={i} value={el.name}>{el.label}</option>
            })
        }
    }

    return (
        <form 
        className="border p-4 shadow-lg rounded"
        onSubmit={addHero}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroDesc}
                    onChange={(e) => setHeroDesc(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option >Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;