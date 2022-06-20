const yup = require("yup");

const userInput = yup.object({
  fname: yup.string("this is not string").required("first name is required"),
  lname: yup.string("this is not string").required(),
  address: yup.string("this is not string").required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(10).required(),
  user_id: yup.string().required(),
});

module.exports = userInput; 