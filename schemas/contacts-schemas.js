import Joi from "joi";

const contactAddShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

export default contactAddShema;
