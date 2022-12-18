const Message = require("../models/message");

const messageController = {
  addMessage: async (req, res) => {
    try {
      const { from, to, message } = req.body;
      const data = new Message({
        message: message,
        sender: from,
        users: [from, to],
      });

      const newMessage = await data.save();
      res.status(200).json("Send message successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getMessage: async (req, res) => {
    try {
      const { from, to } = req.body;
      const messages = await Message.find({
        users: {
          $all: [from, to],
        },
      });

      const validateResponse = messages.map((item) => {
        return {
          fromSelf: item.sender.toString() === from,
          message: item.message,
        };
      });
      res.status(200).json(validateResponse);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = messageController;
