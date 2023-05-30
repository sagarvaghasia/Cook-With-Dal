//Author - Ruchika.
import { Autocomplete, Box, Checkbox, Chip, TextField } from "@mui/material";
import React, { useReducer, useLayoutEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import detailPanelReducer from "./Selection-Panel-Reducer";
import SelectedPanel from "../Selected-Panel-List/Selected-Panel-List";
import ApiHandler from "../../api-handler";
import "./Selection-Panel.css";

function SelectionPanel(props) {
  const initialState = {
    selectedIngredients: props.selectedIngredients,
    clearedIngredients: props.clearedIngredients,
  };
  const [state, dispatch] = useReducer(detailPanelReducer, initialState);
  const initialRender = useRef(true);

  useLayoutEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const requestBody = {
      name: props.selectedTab.name,
      index: props.selectedTab.index,
      isDeleted: props.selectedTab.isDeleted,
      selectedIngredients: state.selectedIngredients,
      clearedIngredients: state.clearedIngredients,
      id: props.selectedTab.id,
      userId : props.userId
    };
    ApiHandler.updateShoppingLists(requestBody).then(
      () => {
        toast.success("Shopping list Updated.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      () => {
        toast.error("Unable to Update Shopping List.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    );
  }, [state.selectedIngredients, state.clearedIngredients]);

  const handleChange = (event, values) => {
    dispatch({ type: "ADD_ITEM", payload: { selectedIngredients: values } });
  };

  const removeOption = (id, values) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { selectedIngredients: values, id: id },
    });
  };

  const handleRecipeChecked = (event, value) => {
    const localState = { ...state };
    const selectedRecipeIndex = localState?.selectedIngredients?.findIndex(
      (obj) => obj.ingredientId === value.ingredientId
    );
    const clearedRecipeIndex = localState?.clearedIngredients?.findIndex(
      (obj) => obj.ingredientId === value.ingredientId
    );
    if (event.target.checked) {
      const selectedIngredients = [
        ...localState?.selectedIngredients?.slice(0, selectedRecipeIndex),
        ...localState?.selectedIngredients?.slice(selectedRecipeIndex + 1),
      ];
      if (clearedRecipeIndex === -1) {
        localState.clearedIngredients.push(value);
      }
      localState.selectedIngredients = selectedIngredients;
    } else if (selectedRecipeIndex === -1) {
      const clearedIngredients = [
        ...localState?.clearedIngredients?.slice(0, clearedRecipeIndex),
        ...localState?.clearedIngredients?.slice(clearedRecipeIndex + 1),
      ];
      localState.clearedIngredients = clearedIngredients;
      localState.selectedIngredients.push(value);
    }

    dispatch({
      type: "UPDATE_ITEM",
      payload: {
        state: localState,
      },
    });
  };

  const { children, value, index, isDeleted } = props;

  return (
    <div role="tabpanel" className="details-panel-container">
      {value === index && !isDeleted && (
        <Box sx={{ pl: 2 }}>
          <div className="heading">{children}</div>
          <Autocomplete
            className="auto-complete-align"
            multiple
            options={props.options}
            disableCloseOnSelect
            getOptionDisabled={(option) =>
              state.clearedIngredients.some((e) => e.ingredient === option.ingredient)
            }
            renderTags={(values) =>
              values.map((value) => (
                <Chip
                  key={value.ingredientId}
                  label={value.ingredient}
                  onDelete={() => {
                    removeOption(value.ingredientId, values);
                  }}
                />
              ))
            }
            value={state.selectedIngredients}
            getOptionLabel={(option) => option.ingredient}
            isOptionEqualToValue={(option, value) =>
              option.ingredientId === value.ingredientId
            }
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  style={{ marginRight: 8 }}
                  checked={selected}
                  disabled={state.clearedIngredients.some(
                    (e) => e.ingredient === option.ingredient
                  )}
                />
                <span className={selected ? "item-highlight" : ""}>
                  {option.ingredient}
                </span>
              </li>
            )}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select Items" />
            )}
          />

          {state.selectedIngredients.length === 0 &&
            state.clearedIngredients.length === 0 && (
              <div className="empty-cart-container">
                <h2>Add item(s) to your list.</h2>
              </div>
            )}
          <div>
            <SelectedPanel
              itemType={"Selected Item(s)"}
              ingredientsList={state.selectedIngredients}
              handleRecipeChecked={handleRecipeChecked}
              checkedValue={false}
            />

            <SelectedPanel
              itemType={"Checked Item(s)"}
              ingredientsList={state.clearedIngredients}
              handleRecipeChecked={handleRecipeChecked}
              checkedValue={true}
            />
          </div>
        </Box>
      )}
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default SelectionPanel;
