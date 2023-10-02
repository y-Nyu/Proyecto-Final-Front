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
        const { name, value } = event.target
        if(name === 'filterByCategory'){
            dispatch(filterProducts(value))
        }else{
            dispatch(clearFilters(value))
        }
        
    }

    return(
        <div>
            <p>Filtrar por categoria: </p>

            <select onChange={handleFilter}>
                <option value={''} name='filterByCategory'>-- Categoria --</option>
                {allCategories.map(category=><option value={category.name} key={category.id}>{category.name}</option>)}
            </select>

            <button onChange={handleFilter} name='clearFilters'> Restablecer filtros </button>

        </div>
    )
}

export default Filters;