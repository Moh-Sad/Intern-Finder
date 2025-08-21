import { Router } from "express";
import { uploadProfilePicture, uploadResume } from "./storage.controller";
import { upload } from "@/middlewares/upload";
import { validate } from "@/middlewares/validate";
import {
    uploadResumeValidation,
    uploadProfilePictureValidation,
} from "./storage.validation";

const router = Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     FileResponse:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           description: URL to the uploaded file
 */

/**
 * @swagger
 * /api/storage/resume:
 *   post:
 *     summary: Upload a resume file
 *     tags: [Storage]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Resume uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileResponse'
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Server error
 */

router.post("/resume", upload.single("file"), validate(uploadResumeValidation, "file"), uploadResume);

/**
 * @swagger
 * /api/storage/profile-picture:
 *   post:
 *     summary: Upload a profile picture
 *     tags: [Storage]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Profile picture uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileResponse'
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Server error
 */

router.post("/profile-picture", upload.single("file"), validate(uploadProfilePictureValidation, "file"), uploadProfilePicture);

export default router;
