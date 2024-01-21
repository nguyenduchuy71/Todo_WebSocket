require("dotenv").config();
const { Novu } = require("@novu/node");
const novu = new Novu(process.env.API_KEY);

const sendNotification = async (userId) => {
  try {
    await novu.trigger(process.env.TEMPLATE_NAME, {
      to: {
        subscriberId: process.env.SUBSCRIBER_ID,
      },
      payload: {
        userId: userId,
      },
    });
  } catch (err) {
    console.error("Error >>>>", { err });
  }
};

module.exports = { sendNotification };
