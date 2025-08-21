import { z } from "zod";

// Resume upload validation → only pdf, doc, docx

export const uploadResumeValidation = z.object({
  mimetype: z.enum([
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ], {
    message: "Resume must be a PDF, DOC, or DOCX file",
  }),
});

// Profile picture validation → only images
export const uploadProfilePictureValidation = z.object({
  mimetype: z
    .string()
    .regex(/^image\//, { message: "Only image files are allowed" }),
});

export type UploadResumeInput = z.infer<typeof uploadResumeValidation>;
export type UploadProfilePictureInput = z.infer<typeof uploadProfilePictureValidation>;
