//Author - Ruchika.
const detailPanelReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "ADD_ITEM":
      newState = { ...state, selectedIngredients: action.payload.selectedIngredients };
      break;
    case "UPDATE_ITEM":
      newState = action.payload.state;
      break;
    case "REMOVE_ITEM":
      newState = {
        ...state,
        selectedIngredients: state?.selectedIngredients?.filter(
          (option) => option.ingredientId !== action.payload.id
        ),
      };
      break;
    default:
      newState = { ...state };
  }
  return newState;
};

export default detailPanelReducer;
