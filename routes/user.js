const userRouter = require("express").Router();
const userController = require("../controller/user");

userRouter.post("/create-user", userController.createUser);

userRouter.put("/update-user/:id", userController.updateUser);

userRouter.get("/get-users", userController.getUsers);

module.exports = userRouter;
