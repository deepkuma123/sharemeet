// const User = require("../models/userModel");
// const OtpModel = require("../models/otp");

// const { otpVerification } = require("../helpers/otpValidate");

// const otpGenerator = require("otp-generator");
// const twilio = require("twilio");

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// const twilioClient = new twilio(accountSid, authToken);

// const sendOtp = async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;
//     const otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       specialChars: false,
//       lowerCaseAlphabets: false,
//     });

//     const cDate = new Date();

//     await OtpModel.findOneAndUpdate(
//       { phoneNumber: phoneNumber },
//       { otp, otpExpiration: new Date(cDate.getTime()) },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );

//     // Uncomment to send OTP via Twilio
//     // twilioClient.messages.create({
//     //   body: `Your OTP is ${otp}`,
//     //   to: phoneNumber,
//     //   from: process.env.TWILIO_PHONE_NUMBER,
//     // });

//     // Render the OTP verification page with the phoneNumber
//     res.render("otp", { phoneNumber: phoneNumber });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       msg: error.message,
//     });
//   }
// };

// const verifyOtp = async (req, res) => {
//   try {
//     const { phoneNumber, otp } = req.body;
//     const otpData = await OtpModel.findOne({ phoneNumber, otp });

//     if (!otpData) {
//       return res.status(400).json({ success: false, msg: "Incorrect OTP" });
//     }

//     const isOtpExpired = await otpVerification(otpData.otpExpiration);
//     if (isOtpExpired) {
//       return res.status(400).json({ success: false, msg: "OTP has expired" });
//     }

//     let user = await User.findOne({ phoneNumber });

//     // Create new user if not found
//     if (!user) {
//       user = await User.create({
//         phoneNumber: phoneNumber,
//         isFirstTime: true, // Assuming this is the first login
//       });
//     }

//     // Render registration page if first time, otherwise render dashboard
//     if (user.isFirstTime) {
//       res.render("register", { phoneNumber: phoneNumber });
//     } else {
//       res.render("dashboard");
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };
// // const verifyOtp = async (req, res) => {
// //   try {
// //     const { phoneNumber, otp } = req.body;
// //     const otpData = await OtpModel.findOne({ phoneNumber, otp });

// //     if (!otpData) {
// //       return res.status(400).json({ success: false, msg: "Incorrect OTP" });
// //     }

// //     const isOtpExpired = await otpVerification(otpData.otpExpiration);
// //     if (isOtpExpired) {
// //       return res.status(400).json({ success: false, msg: "OTP has expired" });
// //     }

// //     let user = await User.findOne({ phoneNumber });

// //     // Create new user if not found
// //     if (!user) {
// //       user = await User.create({
// //         phoneNumber: phoneNumber,
// //         isFirstTime: true, // Assuming this is the first login
// //       });
// //     }

// //     // Construct response JSON with URLs based on isFirstTime
// //     let response = {
// //       success: true,
// //       msg: "OTP verified successfully",
// //     };

// //     if (user.isFirstTime) {
// //       response.redirectUrl = "/api/register?phoneNumber=" + phoneNumber;
// //     } else {
// //       response.redirectUrl = "/api/dashboard";
// //     }

// //     // Send JSON response with URLs
// //     res.status(200).json(response);
// //   } catch (error) {
// //     res.status(500).json({ success: false, msg: error.message });
// //   }
// // };
// const registerUser = async (req, res) => {
//   try {
//     const { phoneNumber, name, email } = req.body;
//     const user = await User.findOneAndUpdate(
//       { phoneNumber },
//       { name, email, isFirstTime: false },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(400).json({ success: false, msg: "User not found" });
//     }

//     // User registered successfully, render dashboard
//     res.json.status(200).render("dashboard");
//   } catch (error) {
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };

// module.exports = {
//   sendOtp,
//   verifyOtp,
//   registerUser,
// };

const User = require("../models/userModel");

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("hobbies");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

