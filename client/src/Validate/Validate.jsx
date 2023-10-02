export const ValidateProduct = (data) => {
  let errors = {};
  if (data.name === "" || data.name.length > 20 || data.name.length < 3) {
    errors.name = "Ingese nombre menor a 20 caracteres";
  }
  if (!/https?:\/\/.*\.(?:png|jpg|gif|bmp|svg|jpeg)/i.test(data.image)) {
    errors.image = "Escribe la URL de la imagen con formato valido";
  }
  if (data.brand === "" || data.brand.length > 20) {
    errors.brand = "Ingese marca menor a 20 caracteres";
  }
  if (data.category === "Seleccione") {
    errors.category = "Seleccione una categoria";
  }
  if (data.description === "" || data.description.length < 10) {
    errors.description = "Ingese detalle de producto mayor a 10 caracteres";
    if (data.price.trim() === "") {
      errors.price = "Ingrese precio";
    } else if (isNaN(Number(data.price))) {
      errors.price = "Stock debe ser un número";
    }
    if (data.stock.trim() === "") {
      errors.stock = "Ingrese stock";
    } else if (isNaN(Number(data.stock))) {
      errors.stock = "Stock debe ser un número";
    }
    if (/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(data.email)) {
      errors.email = "Ingrese una email valido";
    }
    if (errors.cellphone === "") {
      errors.cellphone = "Ingrese una numero celular";
    }
    if (!/(?=.*[a-z])/.test(errors.password)) {
      errors.password = "Requiere una letra minuscula";
    } else if (!/(?=.*[A-Z])/.test(errors.password)) {
      errors.password = "Requiere una letra mayuscula";
    } else if (errors.password.length < 6 || errors.password.length > 10) {
      errors.password = "Requiere entre 6 y 10 caracteres";
    }

  return errors;
  }
}

export const ValidateUser = (data) => {
  let errors = {};
  if (data.name === "" || data.name.length > 20 || data.name.length < 3) {
    errors.name = "Ingese nombre menor a 20 caracteres";
  }
  if (/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(data.email)) {
    errors.email = "Ingrese una email valido";
  }
  if (errors.cellphone === "") {
    errors.cellphone = "Ingrese una numero celular";
  }
  if (!/(?=.*[a-z])/.test(errors.password)) {
    errors.password = "Requiere una letra minuscula";
  } else if (!/(?=.*[A-Z])/.test(errors.password)) {
    errors.password = "Requiere una letra mayuscula";
  } else if (errors.password.length < 6 || errors.password.length > 10) {
    errors.password = "Requiere entre 6 y 10 caracteres";
  }

  return errors;
};
