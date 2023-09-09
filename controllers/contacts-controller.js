import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import Movie from "../models/Contact.js";

const getAll = async (req, res) => {
  const result = await Movie.find();
  res.json(result);
};

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const result = await contactsService.getContactById(id);
//   if (!result) {
//     throw HttpError(404, `Contact with ${id} not Found`);
//   }
//   res.json(result);
// };

// const add = async (req, res) => {
//   const result = await contactsService.addContact(req.body);
//   res.status(201).json(result);
// };

// const remove = async (req, res) => {
//   const { id } = req.params;
//   const result = await contactsService.removeContact(id);
//   if (!result) {
//     throw HttpError(404, `Contact with ${id} not Found`);
//   }
//   res.json({ message: "Delete success" });
// };

// const update = async (req, res) => {
//   const { id } = req.params;
//   const result = await contactsService.updateContact(id, req.body);
//   if (!result) {
//     throw HttpError(404, `Contact with ${id} not Found`);
//   }
//   res.json(result);
// };

export default {
  getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  // add: ctrlWrapper(add),
  // remove: ctrlWrapper(remove),
  // update: ctrlWrapper(update),
};
