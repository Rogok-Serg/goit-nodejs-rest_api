import contactSchemas from "../../schemas/contacts-schemas.js";
import { validateBody } from "../../decorators/index.js";

const addContactValidate = validateBody(contactSchemas.contactAddSchema);

export default {
  addContactValidate,
};
