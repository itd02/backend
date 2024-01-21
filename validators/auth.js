const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");


const validateSignUpRequest = [
check("firstName").notEmpty().withMessage("First Name is required"),
check("lastName").notEmpty().withMessage("Last Name is required"),
check("email").isEmail().withMessage("Valid Email required"),
check("password")
   .isLength({ min: 6 })
   .withMessage("Password must be at least 6 character long"),
];
const validateSignIpRequest = [
check("email").isEmail().withMessage("Valid Email required"),
check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
]

const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
 
  if (errors.array().length > 0) {
      return res
              .status(StatusCodes.BAD_REQUEST)
              .json({ error: errors.array()[0].msg });
  }
  next();
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
} 

module.exports = {
  validateSignUpRequest,
  isRequestValidated,
  validateSignIpRequest,
  authenticateToken
};
