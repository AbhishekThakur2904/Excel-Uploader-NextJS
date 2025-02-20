import express from "express";
import { uploadExcelFile } from "./uploads.controller";
import { upload } from "../common/middleware/multer.middleware";

const router = express.Router();

router.post("/", upload.single("file"), uploadExcelFile);

export default router;
