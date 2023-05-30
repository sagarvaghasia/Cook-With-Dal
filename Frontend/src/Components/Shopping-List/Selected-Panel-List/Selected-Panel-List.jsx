//Author - Ruchika.
import React from "react";
import { Checkbox } from "@mui/material";

import "./Selected-Panel-List.css";

function SelectedPanel(props) {
  return (
    <div>
      {props.ingredientsList.length > 0 && (
        <div className="sub-heading">{props.itemType}</div>
      )}
      <ul>
        {props.ingredientsList.map((list, index) => {
          return (
            <li key={index}>
              <div className="align-selected-items">
                <span className={props.checkedValue ? "item-checked" : ""}>
                  {list.ingredient}
                </span>
                <Checkbox
                  checked={props.checkedValue}
                  onChange={(event) =>
                    props.handleRecipeChecked(event, list)
                  }
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SelectedPanel;
