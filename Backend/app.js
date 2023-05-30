const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const shoppingListRouter = require("./src/routes/ShoppingListRoutes");
const recipeRouter = require("./src/routes/RecipeRoutes");
const recipeLikedByUserRouter = require("./src/routes/RecipeLikedByUserRoutes");
const userRouter = require("./src/routes/UserRoutes");
const bookmarkRouter = require("./src/routes/BookmarkRoutes");
const mealPlannerRouter = require("./src/routes/MealPlannerRoutes");
const notificationRouter = require("./src/routes/NotificationRoutes");

require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "./uploads")));
app.use(express.static(path.join(__dirname, "./useruploads")));

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use("/api/shopping-list", shoppingListRouter);
app.use("/api/recipe", recipeRouter);
app.use("/api/recipeLikedByUser", recipeLikedByUserRouter);
app.use("/api/add-recipe", recipeRouter);
app.use("/api/users", userRouter);
app.use("/api/bookmarkRecipe", bookmarkRouter);
app.use("/api/mealPlan", mealPlannerRouter);
app.use("/api/notification", notificationRouter);

//configure mongoose
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.y7706nu.mongodb.net/cook-with-dal?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port 8080`);
});
app.disable("x-powered-by");
module.exports = app;
