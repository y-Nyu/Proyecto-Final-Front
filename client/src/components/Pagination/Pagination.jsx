const Pagination = (props) => {

    const items = props.items.map( (item, index) => {
        return<li key={item.id}> {item.name} </li>
    })
    return(
<div>
    <h1>Pag: {props.currentPage}</h1>

    <button onClick={props.prevHandler}>Prev</button>
    <button onClick={props.nextHandler}>Next</button>

    <h2>items:</h2>
    <ul>
        {items}
    </ul>
</div>
    )
    };

export default Pagination;