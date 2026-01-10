import express from "express";
const router = express.Router();

import {isAuthenticatedUser} from "../middlewares/auth.js";
import { stripeCheckoutSession } from "../controllers/paymentContollers.js";

router.route("/payment/checkout_sesion").post(isAutenticatedUser, stripeCheckoutSession);

export default router;