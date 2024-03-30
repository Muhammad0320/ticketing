import { requestValidator, requireAuth } from "@m0ticketing/common";
import express from "express";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  requireAuth,
  [
    body("token").not().isEmpty().withMessage("please provide a token"),
    body("orderId").not().isEmpty().withMessage("User id is required"),
  ],
  requestValidator,
  () => {}
);
