// import express from "express";
// import crypto from "crypto";
// import cors from "cors";

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Configuration / Secrets
// const APP_SECRET = process.env.APP_SECRET || "your_app_secret";
// const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "your_verify_token";
// const IS_EMULATOR = "true";

// const RANDOM_MESSAGES = [
//   "Hello there! Thanks for reaching out. 👋",
//   "Got your message! Hope you're having a great day. 🚀",
//   "Beep boop! This is an automated random reply. 🤖",
//   "Thanks for checking in! How can we help today? ✨"
// ];

// app.use(cors());

// // Capture raw Body bytes BEFORE standard JSON parsing takes place
// app.use(
//   express.json({
//     verify: (req, _res, buf) => {
//       req.rawBody = buf;
//     }
//   })
// );

// // Webhook Handshake (GET)
// app.get("/webhook", (req, res) => {
//   const mode = req.query["hub.mode"];
//   const token = req.query["hub.verify_token"];
//   const challenge = req.query["hub.challenge"];

//   if (mode === "subscribe" && token === VERIFY_TOKEN) {
//     return res.status(200).send(challenge);
//   }
//   return res.sendStatus(403);
// });

// // Incoming Webhook Messages (POST)
// app.post("/webhook", async (req, res) => {
//   const signature = req.headers["x-hub-signature-256"];

//   if (!IS_EMULATOR) {
//     if (!signature) {
//       console.warn("Missing signature header.");
//       return res.sendStatus(401);
//     }

//     const expectedSignature =
//       "sha256=" +
//       crypto
//         .createHmac("sha256", APP_SECRET)
//         .update(req.rawBody)
//         .digest("hex");

//     const sigBuffer = Buffer.from(signature);
//     const expectedBuffer = Buffer.from(expectedSignature);

//     if (
//       sigBuffer.length !== expectedBuffer.length ||
//       !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
//     ) {
//       console.warn("Invalid signature!");
//       return res.sendStatus(403);
//     }
//   }

//   // Process Valid Payload
//   const body = req.body;
//   if (body.object === "whatsapp_business_account") {
//     const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

//     if (message?.text?.body) {
//       const fromNumber = message.from;
//       const text = message.text.body;
//       console.log(`[Received from ${fromNumber}]: ${text}`);

//       const randomReply =
//         RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)];
      
//       // Place your Gemini API / response logic here
//       console.log(`[Replying to ${fromNumber}]: ${randomReply}`);
//     }
//   }

//   return res.status(200).send("EVENT_RECEIVED");
// });

// app.listen(PORT, () => {
//   console.log(`Express webhook emulator running on http://localhost:${PORT}`);
// });