const { jwtVerify } = require("../helpers/token");

const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if(!token) {
      throw {
        name: "Custom_Error",
        status: 401,
        message: `Invalid Token data!`
      };
    }

    const decodedJWT = jwtVerify(token);

    req.userData = decodedJWT;

    next();

  } catch (err) {
    next(err)
  }
};

const adminAccess = (req, res, next) => {
  try {
    if (req.userData.user_type === "Admin") {
      next();
    } else {
      throw {
        name: "Custom_Error",
        status: 403,
        message: "Forbidden access!"
      };
    }

  } catch (err) {
    next(err)
  }
};


module.exports = {
  authentication,
  adminAccess
};
