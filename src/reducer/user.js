export const userReducer = (state = null, action) => {
    switch (action.type) {
        case "USERS_LOGGED":
            return action.payload;
        case "USERS_LOGOUT":
            return action.payload;
        default:
            return state;
    }
};
