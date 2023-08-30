const aws = require("aws-sdk");
require("dotenv").config();
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const SES_CONFIG = {
  accesskey: process.env.accesskey,
  secretkey: process.env.secretkey,
  region: process.env.region,
};

const aws_ses = new aws.SES(SES_CONFIG);

const sendEmail = async (recipientEmail, name) => {
  let params = {
    Source: process.env.AWS_SES_SENDER,
    Destination: {
      ToAddresses: [recipientEmail],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "<h1>This is the body of my email!</h1>",
        },
        Text: {
          Charset: "UTF-8",
          Data: "This is the body of my email!",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Hello, ${name}!`,
      },
    },
  };

  try {
    const res = await aws_ses.sendEmail(params).promise();
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

sendEmail("", "");
