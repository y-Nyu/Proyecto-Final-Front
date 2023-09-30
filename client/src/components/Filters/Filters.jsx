import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getCategories, filterProducts } from '../../redux/Actions/Products/productsActions'

const Filters = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCategories())
    },[])

    const allCategories = useSelector(state=>state.categories)

    const handleFilter = (event) => {
        dispatch(filterProducts(event.target.value))
    }

    return(
        <div>
            <p>Filtrar por categoria: </p>

            <select onChange={handleFilter}>
                <option value={''}>-- Categoria --</option>
                {allCategories.map(category=><option value={category.name} key={category.id}>{category.name}</option>)}
            </select>

        </div>
    )
}

export default Filters;