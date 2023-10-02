import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getCategories, 
    filterProducts, 
    clearFilters 
} from '../../redux/Actions/Products/productsActions'

const Filters = () => {
    const dispatch = useDispatch();
    const allCategories = useSelector(state=>state.categories);
    
    useEffect(()=>{
        dispatch(getCategories())
    },[]);

    const handleFilter = (event) => {
        const {name, value} = event.target
        if(name === 'filter') {
            dispatch(filterProducts(value))
        }
        else dispatch(clearFilters())
    };

    return(
        <div>
            <p>Filtrar por categoria: </p>

            <select onChange={handleFilter} name='filter'>
                <option value={''}>-- Categoria --</option>
                {
                    allCategories.map(category=>
                        <option 
                            value={category.name} key={category.id}>{category.name}
                        </option>
                )}
            </select>

            <button name='clean' onClick={handleFilter}> Restablecer filtros </button>
        </div>
    )
};

export default Filters;