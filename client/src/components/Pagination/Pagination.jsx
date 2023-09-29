// import { page } from "../../redux/actions";
// import { useDispatch } from "react-redux";

// const Pagination = () => {
//   const dispatch = useDispatch();


//   const pagination = (e) => {
//     dispatch(page(e.target.name));
//   };

//   return (
//     <div>
//       <button name="prev" onClick={pagination}>
//         Previous
//       </button>
//       <button name="next" onClick={pagination}>
//         Next
//       </button>
//     </div>
//     );
//   };
  
//   export default Pagination;


//---------------------------------------

// const Pagination = () => {
// return(
//             <div className="text-center" aria-label="Page navigation example">
//       <ul className="pagination">
//         <li className="page-item">
//           <a className="page-link" href="#" aria-label="Previous">
//             <span aria-hidden="true">&laquo;</span>
//           </a>
//         </li>
//         <li className="page-item"><a className="page-link" href="#">1</a></li>
//         <li className="page-item"><a className="page-link" href="#">2</a></li>
//         <li className="page-item"><a className="page-link" href="#">3</a></li>
//         <li className="page-item">
//           <a className="page-link" href="#" aria-label="Next">
//             <span aria-hidden="true">&raquo;</span>
//           </a>
//         </li>
//       </ul>
//             </div>
// )
// }

//---------------------------------------

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