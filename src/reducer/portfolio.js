export const portfolioReducer = (state = null, action) => {
  switch (action.type) {
    case "PORTFOLIO_INFO":
      return action.payload;
    default:
      return state;
  }
};
