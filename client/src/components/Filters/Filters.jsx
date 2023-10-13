import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, filterProducts, clearFilters, ordered } from '../../redux/Actions/Products/productsActions';
import { Select, Button, Menu } from 'antd';
import { FilterOutlined , AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import style from "./Filters.module.css";
import Searchbar from '../SearchBar/SearchBar';

const { Option } = Select;
const { SubMenu } = Menu;

const alphaSortTypes = {
  alfa_asc: "alfa_asc",
  alfa_desc: "alfa_desc",
};

const Filters = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories);

  const prices = [5000, 7500, 10000, 25000];

  const [filters, setFilters] = useState({
    category: undefined,
    price: undefined,
    sort: undefined,
    name: undefined,
  });

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleFilter = (value, name) => {
    if (name === 'filter') {
      setFilters((prev) => ({
        ...prev,
        category: value,
      }));
      const filterString = createFilterString({ ...filters, category: value });
      dispatch(filterProducts(filterString));
    } else if (name === 'clean') {
      setFilters({
        category: undefined,
        price: undefined,
        sort: undefined,
        name: undefined,
      });
      dispatch(clearFilters());
    }
  };

  const createFilterString = (filters_obj) => {
    const filtersArr = [];

    for (const key of Object.keys(filters_obj)) {
      if (filters_obj[key] !== undefined) {
        filtersArr.push("" + key + "=" + filters_obj[key]);
      }
    }
    let filterString = "?";
    filterString += filtersArr.join("&");
    return filtersArr.length ? filterString : "";
  };

  const changeMaxPrice = (value) => {
    setFilters((prev) => ({
      ...prev,
      price: value,
    }));
    const filterString = createFilterString({ ...filters, price: value });
    dispatch(filterProducts(filterString));
  };

  const changeSort = (value) => {
    if (alphaSortTypes[value]) {
      const order = value === alphaSortTypes.alfa_asc;
      dispatch(ordered(order));
    }

    setFilters((prev) => ({
      ...prev,
      sort: value,
    }));

    const filterString = createFilterString({ ...filters, sort: value });
    dispatch(filterProducts(filterString));
  };

  const searchByName = (name) => {
    setFilters((prev) => ({
      ...prev,
      name,
    }));
    const filterString = createFilterString({ ...filters, name });
    dispatch(filterProducts(filterString));
  };

  return (
    <div className={style.container}>
      <Searchbar onClick={searchByName} />
      <div className={`container ${style.container}`}>
        <div className="row">
          <div className={`col-md-3 d-md-block ${style.sideB}`}>
            <div id="sidebar" className={`sidebar`}>
              <Menu mode="vertical" style={{ width: 256 }} className={`${style.sidebar}`}>
                <SubMenu key="sub1" title={<span><AppstoreOutlined /> Categorías</span>}>
                  <Menu.Item key="all" onClick={() => handleFilter(undefined, 'filter')}>Todos</Menu.Item>
                  {allCategories.length > 0 ? (
                    allCategories.map((category) => (
                      <Menu.Item key={category.name} onClick={() => handleFilter(category.name, 'filter')}>
                        {category.name}
                      </Menu.Item>
                    ))
                  ) : (
                    <Menu.Item>Cargando categorías...</Menu.Item>
                  )}
                </SubMenu>
                <SubMenu key="sub2" title={<span><FilterOutlined /> Precio Máximo</span>}>
                  <Menu.Item key="all" onClick={() => handleFilter(undefined, 'filter')}>Todos</Menu.Item>
                  {prices.map((price, index) => (
                    <Menu.Item key={price} onClick={() => changeMaxPrice(price)}>
                      ${price} ARS
                    </Menu.Item>
                  ))}
                </SubMenu>
                <SubMenu key="sub3" title={<span><UnorderedListOutlined /> Ordenar por</span>}>
                  <Menu.Item key="asc" onClick={() => changeSort('asc')}>Precio Ascendente</Menu.Item>
                  <Menu.Item key="desc" onClick={() => changeSort('desc')}>Precio Descendente</Menu.Item>
                  <Menu.Item key={alphaSortTypes.alfa_asc} onClick={() => changeSort(alphaSortTypes.alfa_asc)}>Alfabético Ascendente</Menu.Item>
                  <Menu.Item key={alphaSortTypes.alfa_desc} onClick={() => changeSort(alphaSortTypes.alfa_desc)}>Alfabético Descendente</Menu.Item>
                </SubMenu>
              </Menu>
              <div className="d-flex justify-content-center mt-2">
                <Button
                  className={`${style.btnSecondary}`}
                  name="clean"
                  onClick={() => handleFilter(undefined, 'clean')}
                >
                  Restablecer filtros
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
