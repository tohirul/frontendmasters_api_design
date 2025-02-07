import { Request, Response, Router } from "express";
import { body } from "express-validator";
import {
  handleInputValidationErrors,
  handleUserRequests,
} from "./utilities/middlewares";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import { getUsers } from "./handlers/user";

const router = Router();

// TODO: User routes
router.get("/user", getUsers);

// TODO product routes
router.get("/product", (req: Request, res: Response) =>
  handleUserRequests(req, res, getProducts)
);
router.get("/product/:id", (req, res) => {
  handleUserRequests(req, res, getOneProduct);
});
router.post(
  "/product",
  body("name").exists().isString().withMessage("Name is required"),
  body("price").exists().isFloat().withMessage("Price is required"),
  body("description")
    .exists()
    .isString()
    .withMessage("Description is required"),

  handleInputValidationErrors,
  (req: Request, res: Response): void => {
    handleUserRequests(req, res, createProduct);
  }
);
router.put(
  "/product/:id",
  body("name").isString().optional(),
  body("price").isFloat().optional(),
  body("description").isString().optional(),

  handleInputValidationErrors,
  (req: Request, res: Response): void => {
    handleUserRequests(req, res, updateProduct);
  }
);
router.delete("/product/:id", (req, res) => {
  handleUserRequests(req, res, deleteProduct);
});

// TODO: Update routes
router.get("/update", (req, res) => {
  handleUserRequests(req, res, getUpdates);
});
router.get("/update/:id", getOneUpdate);
router.post(
  "/update",
  body("title").exists().isString().withMessage("Title is required"),
  body("body").exists().isString().withMessage("Body is required"),
  body("productId").exists().isString().withMessage("ProductId is required"),
  handleInputValidationErrors,
  createUpdate
);
router.put(
  "/update/:id",
  body("title").optional().isString().optional(),
  body("body").optional().isString().optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional().isString().optional(),
  handleInputValidationErrors,
  (req, res) => {
    handleUserRequests(req, res, updateUpdate);
  }
);
router.delete("/update/:id", (req, res) => {
  handleUserRequests(req, res, deleteUpdate);
});

// TODO: Update point routes
router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {});
router.post(
  "/updatepoint",
  body("name").exists().isString().withMessage("Name is required"),
  body("description")
    .exists()
    .isString()
    .withMessage("Description is required"),
  handleInputValidationErrors,
  (req, res) => {}
);
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputValidationErrors,
  (req, res) => {}
);
router.delete("/updatepoint/:id", (req, res) => {});

// TODO: User routes
router.get("/user", (req, res) => {});
router.get("/user/:id", (req, res) => {});

router.put("/user/:id", (req, res) => {});
router.delete("/user/:id", (req, res) => {});

export default router;
