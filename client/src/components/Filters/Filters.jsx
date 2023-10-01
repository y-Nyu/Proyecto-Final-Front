import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getCategories, filterProducts, clearFilters } from '../../redux/Actions/Products/productsActions'

const Filters = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCategories())
    },[])

    const allCategories = useSelector(state=>state.categories)

    const handleFilter = (event) => {
            dispatch(filterProducts(event.target.value))
        } 

    const showAll = () => {
            dispatch(clearFilters())

    }

    return(
        <div>
            <p>Filtrar por categoria: </p>

            <select onChange={handleFilter}>
                <option value={''}>-- Categoria --</option>
                {allCategories.map(category=><option value={category.name} key={category.id}>{category.name}</option>)}
            </select>

            <button onClick={showAll}> Restablecer filtros </button>

        </div>
    )
}

export default Filters;