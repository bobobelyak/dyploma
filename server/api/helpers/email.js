const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const ejs = require("ejs");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const oauth2Client = new OAuth2(
    process.env.EMAIL_CLIENT_ID, // ClientID
    process.env.EMAIL_CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);


const htmlText = {
  1: '' , //sight
  2: '', //event
  3: '' // feed
};

const sendEmail = async (receiver = 'b.tverdoukh@relevant.software', template) => {
  try {
    oauth2Client.setCredentials({
      refresh_token: process.env.EMAIL_REFRESH_TOKEN,
    });

    const tokens = await oauth2Client.refreshAccessToken();
    const accessToken = tokens.credentials.access_token;

    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "thefirstflyerok@gmail.com",
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    ejs.renderFile('/Users/a111/Desktop/explore-lviv-server/public/email-templates/sight.ejs', (error, result) => {
      if (error) throw error;

      const mailOptions = {
        from: "thefirstflyerok@gmail.com",
        to: receiver,
        subject: "Node.js Email with Secure OAuth",
        generateTextFromHTML: true,
        html: result,
        // html: "<img style='width: 250px; height: 250px; object-fit: cover;' src='cid:image'/>",
        attachments: [{
          filename: 'side-img.jpg',
          path: '/Users/a111/Desktop/explore-lviv-server/uploads/1a91b0f0-4767-11e9-b7ce-03e25fc22e86.jpeg',
          cid: 'image' //same cid value as in the html img src
        }]
      };

      smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(`Email to ${receiver} sent successful`);
        smtpTransport.close();
      });
    });
  } catch (e) {
    console.log(e)
  }
};

module.exports = sendEmail;
