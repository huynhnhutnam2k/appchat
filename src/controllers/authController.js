const User = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let refreshTokens = [];
const authController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  },
  login: async (req, res) => {
    try {
      const { username, password, email } = req.body;

      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json("Email or password is not valid");
        // throw new Error("Email or password is not valid");
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(404).json("Email or password is not valid");
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...other } = user._doc;
        res.status(200).json({ ...other, accessToken, refreshToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },
  register: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(404).json("User already exists");
      }
      // const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        ...req.body,
        password: hashPassword,
      });
      await newUser.save();
      res.status(200).json("Register successfully");
    } catch (error) {
      res.status(404).json(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  setAvatar: async (req, res) => {
    try {
      const userId = req.params.id;
      const avatarImage = req.body.image;
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isSetAvatar: true,
          avatar: avatarImage,
        },
        { new: true }
      );
      return res.json({
        isSetAvatar: userData.isSetAvatar,
        avatar: userData.avatar,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
