import express from "express";
const router = express.Router();

import { isAuthenticatedUser } from "../middlewares/auth.js";
import { stripeCheckoutSession, stripeWebhook } from "../controllers/paymentContollers.js";

router.post("/payment/checkout_session", isAuthenticatedUser, stripeCheckoutSession);

router.route("/payment/webhook").post(stripeWebhook);

export default router;