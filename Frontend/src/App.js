import { ThemeProvider, createTheme } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import FeedPage from "./Components/Feed/FeedPage";
import UpdateRecipePage from "./Components/UpdateRecipe/UpdateRecipePage";
import AddRecipe from "./Components/AddRecipe/AddRecipe";
import MealPlanner from "./Components/Planner/MealPlanner";
import DisplayProfilePageDemo3 from "./Components/Profile Management/DisplayProfileDemo3";
import UpdateProfile from "./Components/Profile Management/UpdateProfile";
import ShoppingList from "./Components/Shopping-List/Shopping-List";
import ForgetPassword from "./Components/User Management/ForgetPassword";
import Login from "./Components/User Management/Login";
import NewPassword from "./Components/User Management/NewPassword";
import SecurityQuestion from "./Components/User Management/SecurityQuestion";
import Signup from "./Components/User Management/Signup";
import ViewRecipe from "./Components/ViewRecipe/ViewRecipe";

let theme = createTheme({
  palette: {
    primary: {
      main: "#e55727",
    },
    secondary: {
      main: "#000",
    },
  },
});

function App() {
  const location = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {location.pathname === "/" ||
        location.pathname === "/signup" ||
        location.pathname === "/forgotpassword" ||
        location.pathname === "/security-question" ||
        location.pathname === "/new-password" ? null : (
          <Navbar />
        )}
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgetPassword />} />
            <Route path="/security-question" element={<SecurityQuestion />} />
            <Route path="/new-password" element={<NewPassword />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/profilepage" element={<DisplayProfilePageDemo3 />} />
            <Route path="/updateRecipe" element={<UpdateRecipePage />} />
            <Route path="/addRecipe" element={<AddRecipe />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/shoppingList" element={<ShoppingList />} />
            <Route path="/view-recipe" element={<ViewRecipe />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
