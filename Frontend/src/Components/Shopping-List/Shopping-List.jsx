//Author - Ruchika.
import React, { useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  DialogTitle,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SelectionPanel from "./Selection-Panel-List/Selection-Panel";
import ApiHandler from "../api-handler";
import "./Shopping-List.css";

function ShoppingList() {
  const [value, setValue] = React.useState(0);
  const [tabs, setTabs] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [itemName, setItemName] = React.useState("");
  const [options, setOptions] = React.useState([]);

  useEffect(() => {
    setTimeout(() => {
      const firstVisibleIndex = tabs.findIndex((item) => !item.isDeleted);
      if (firstVisibleIndex > -1) {
        setValue(firstVisibleIndex);
      }
    }, 100);
  }, [tabs]);

  useEffect(() => {
    ApiHandler.getRecipeOptions().then(
      (response) => {
        setOptions(response.data.options);
        ApiHandler.getShoppingLists(localStorage.getItem("email")).then(
          (list) => {
            setTabs(list.data.shoppingList);
          },
          () => {
            toast.error("Failed to retrieve Shopping List(s)", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            setTabs([]);
          }
        );
      },
      () => {
        setOptions([]);
      }
    );
  }, []);

  const handleChange = (event, newTabIndex) => {
    if (newTabIndex !== undefined && newTabIndex > -1) {
      setValue(newTabIndex);
    }
  };

  const handleClose = () => {
    if (itemName) {
      const newTabObject = {
        name: itemName,
        userId: localStorage.getItem("email"),
        index: tabs.length + 1,
        isDeleted: false,
        selectedIngredients: [],
        clearedIngredients: [],
      };
      setOpen(false);
      setFocus(false);
      ApiHandler.createShoppingLists(newTabObject).then(
        (response) => {
          setTabs([...tabs, response.data.createdList]);
          toast.success("Shopping list Created.", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        },
        () => {
          toast.error("Unable to Create Shopping List", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      );
      setValue(0);
      setItemName("");
    } else {
      setFocus(true);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const deleteSelectedTab = (selectedIndex) => {
    let totalTabs = [...tabs];
    if (selectedIndex > -1) {
      totalTabs[selectedIndex].isDeleted = true;
      ApiHandler.deleteShoppingLists(totalTabs[selectedIndex]).then(
        () => {
          toast.success("Shopping list Deleted.", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setTabs(totalTabs);
        },
        () => {
          toast.error("Unable to Delete Shopping List", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          totalTabs[selectedIndex].isDeleted = false;
          setTabs(totalTabs);
        }
      );
    } else {
      setTabs(totalTabs);
    }
  };

  const showDefaultView = () => {
    if (tabs.length === 0) {
      return true;
    } else {
      const deleteFlag =
        tabs.filter((item) => item.isDeleted).length === tabs.length;
      return deleteFlag;
    }
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return (
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="14" xl="10">
          {showDefaultView() && (
            <div className="default-view-container">
              <div className="image-comtainer">
                <img
                  src="empty.jpg"
                  alt="empty-list-logo"
                  className="empty-list-logo"
                />
                <h2>Oops, you don't have any shopping list.</h2>
              </div>
              <Button
                className="button-style"
                variant="outlined"
                color="secondary"
                onClick={handleClickOpen}
              >
                Get Started
              </Button>
            </div>
          )}
          {!showDefaultView() && (
            <Box className="shopping-list-container">
              <div className="tab-container">
                <AppBar position="static" className="app-bar-style">
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical Tabs"
                    indicatorColor="secondary"
                    textColor="inherit"
                    sx={{ borderRight: 1, borderColor: "divider" }}
                  >
                    {tabs.map((tabValue, index) => {
                      return (
                        <Tab
                          label={tabValue.name}
                          {...a11yProps(index)}
                          key={index}
                          className={`align-items ${
                            tabValue.isDeleted ? "hidden" : ""
                          }`}
                          icon={
                            <DeleteForeverIcon
                              onClick={() => {
                                deleteSelectedTab(index);
                              }}
                            />
                          }
                          iconPosition="end"
                        />
                      );
                    })}
                  </Tabs>
                </AppBar>
                <Button
                  className="button-style"
                  variant="outlined"
                  color="secondary"
                  onClick={handleClickOpen}
                >
                  + Add New List
                </Button>
              </div>
              <div className="tab-panel-container">
                {tabs.map((tabValue, index) => {
                  return (
                    <SelectionPanel
                      options={options}
                      key={index}
                      value={value}
                      selectedTab={tabValue}
                      selectedIngredients={tabValue.selectedIngredients}
                      clearedIngredients={tabValue.clearedIngredients}
                      isDeleted={tabValue.isDeleted}
                      index={index}
                      userId={tabValue.userId}
                    >
                      {tabValue.name}
                    </SelectionPanel>
                  );
                })}
              </div>
            </Box>
          )}
          <Dialog open={open} disableEscapeKeyDown>
            <DialogTitle>Enter Shopping List Name</DialogTitle>
            <DialogContent>
              <TextField
                error={!itemName && focus ? true : false}
                helperText={
                  !itemName && focus ? "Please Enter Shopping List Name." : ""
                }
                required
                aria-label="List Name"
                aria-required="true"
                label="List Name"
                type="text"
                inputProps={{ maxLength: 50 }}
                fullWidth
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
                onFocus={() => {
                  setFocus(true);
                }}
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setFocus(false);
                  setOpen(false);
                  setItemName("");
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleClose}>Save</Button>
            </DialogActions>
          </Dialog>
        </MDBCol>
      </MDBRow>
      <ToastContainer autoClose={5000} />
    </MDBContainer>
  );
}

export default ShoppingList;
