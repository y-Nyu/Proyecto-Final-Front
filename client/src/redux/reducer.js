import { ROLE } from "./action-types";

const initialState = {
    users: [],
    userRole: "USER",
    usersCopy: [],
    items: [],
    itemsCopy: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ROLE:
            return {...state, userRole: action.payload};

        default:
            return {...state}
    }
}

export default reducer;