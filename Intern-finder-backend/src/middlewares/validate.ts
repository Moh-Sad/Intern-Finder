import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError, ZodRawShape } from "zod";

export const validate =
    (schema: ZodObject<ZodRawShape>, source: "body" | "params" | "query" | "file" = "body") =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                if (source === "file") {
                    schema.parse(req.file);
                } else {
                    schema.parse(req[source]);
                }
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json({
                        message: "Validation error",
                        errors: error.issues.map((err) => ({
                            path: err.path.join("."),
                            message: err.message,
                        })),
                    });
                }
                return res.status(500).json({ message: "Internal validation error" });
            }
        };

