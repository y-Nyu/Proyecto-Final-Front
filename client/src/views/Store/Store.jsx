import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import {
  getAllProducts,
  setPage,
} from "../../redux/Actions/Products/productsActions";
import Filters from "../../components/Filters/Filters";

const Store = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const currentPage = useSelector((satate) => satate.currentPage);
  const productsPerPage = 6;
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  useEffect(() => {
    // if (allProducts.length == 0) {
      dispatch(getAllProducts());
    // }
  }, [dispatch]);

  // Verificar si solo hay una página y establecer la página actual en 1
  useEffect(() => {
    if (totalPages <= 3 && currentPage !== 1) {
      dispatch(setPage(1));
    }
  }, [currentPage, totalPages, dispatch]);

  // Función para obtener los products de la página actual
  const getCurrentProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return allProducts.slice(startIndex, endIndex);
  };

  // Función para cambiar a la página anterior
  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  // Función para cambiar a la página siguiente
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
    }
  };

  return (
    <div>
      <Filters />
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={handlePrevPage}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              {currentPage}/{totalPages}
            </span>
          </li>
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={handleNextPage}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
      <div>
        <Cards products={getCurrentProducts()} />
      </div>
    </div>
  );
};

export default Store;
