export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const SEARCH_USERS = "SEARCH_USERS";
export const SET_SEARCH_TYPE = "SET_SEARCH_TYPE";
export const ORDERED = "ORDERED";

export const searchProducts = (searched) => {
  return { type: SEARCH_PRODUCTS, payload: searched };
};

export const searchUsers = (searched) => {
  return { type: SEARCH_USERS, payload: searched };
};

export const setSearchType = (searchType) => {
  return { type: SET_SEARCH_TYPE, payload: searchType };
};

export const ordered = (order) => {
  return { type: ORDERED, payload: order };
};
