export const postfoliodata = (state = null, action) => {
  switch (action.type) {
    case "REGISTER_INFO":
      return action.payload;
    default:
      return state;
  }
};
