import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import contactValidation from "../../middleware/validation/contact-validation.js";

const router = express.Router();

router.get("/", contactsController.getAll);

// router.get("/:id", contactsController.getById);

// router.post("/", contactValidation.addContactValidate, contactsController.add);

// router.delete("/:id", contactsController.remove);

// router.put(
//   "/:id",
//   contactValidation.addContactValidate,
//   contactsController.update
// );

export default router;
