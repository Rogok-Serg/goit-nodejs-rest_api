import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { validateBody } from "../../decorators/index.js";
import * as contactSchemas from "../../models/Contact.js";
import { isValidId, authenticate } from "../../middlewares/index.js";

const contactAddValidate = validateBody(contactSchemas.contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(
  contactSchemas.contactUpdateFavoriteSchema
);

const router = express.Router();
router.use(authenticate);

router.get("/", contactsController.getAll);

router.get("/:id", isValidId, contactsController.getById);

router.post("/", contactAddValidate, contactsController.add);

router.delete("/:id", isValidId, contactsController.remove);

router.put("/:id", isValidId, contactAddValidate, contactsController.update);
router.patch(
  "/:id/favorite",
  isValidId,
  contactUpdateFavoriteValidate,
  contactsController.updateStatusContact
);

export default router;
