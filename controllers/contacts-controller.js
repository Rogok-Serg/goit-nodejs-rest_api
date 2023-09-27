import fs from "fs/promises";
import Contact from "../models/Contact.js";

import Jimp from "jimp";

import { HttpError, cloudinary } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 2 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not Found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { id: owner } = req.user;
  const { path: oldPath } = req.file;
  const file = await Jimp.read(oldPath);
  file.resize(250, 250).write(oldPath);

  const { url: avatarURL } = await cloudinary.uploader.upload(oldPath, {
    folder: "avatars",
  });
  await fs.unlink(oldPath);
  const result = await Contact.create({ ...req.body, avatarURL, owner });
  res.status(201).json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not Found`);
  }
  res.json({ message: "Delete success" });
};

const update = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not Found`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  if (!req.body.favorite) {
    throw HttpError(400, "missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
