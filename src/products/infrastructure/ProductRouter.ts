import express from "express";
import { createProductController, deleteProductController, getProductController, updateProductController } from "./dependencies";
import { upload } from "./middlewares/upload";

export const productRouter = express.Router();

productRouter.use(upload);


// Rutas
productRouter.post("/", createProductController.run.bind(createProductController));
productRouter.delete("/:id", deleteProductController.run.bind(deleteProductController));
productRouter.get("/:id", getProductController.run.bind(getProductController));
productRouter.post("/:id", updateProductController.run.bind(updateProductController));

export default productRouter;
