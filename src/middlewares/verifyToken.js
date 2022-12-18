const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const accessToken = req.headers.accessToken;
  const refreshToken = req.headers.refreshToken;

  if (accessToken) {
    const token = accessToken.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};

module.exports = verifyToken;
