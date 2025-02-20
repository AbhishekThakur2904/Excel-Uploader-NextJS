import { Request, Response } from "express";
import { processAndStoreExcel } from "./uploads.services";


/**
 * Endpoint to upload an Excel file for processing.
 * @param {Request} req Express request object.
 * @param {Response} res Express response object.
 * @returns {Promise<void>} A promise that resolves when the endpoint has finished processing the request.
 * @throws {Error} If there is an error processing the file.
 */
export const uploadExcelFile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const result = await processAndStoreExcel(req.file.path);

    res.status(200).json({ message: "File processed successfully", result });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ message: "Server error" });
  }
};
/**
 * Simple test endpoint to verify that the backend is working.
 * @returns {object} A JSON object with a "Hello, World!" message.
 */

export const helloWorld = (req: Request, res: Response): void => {
  res.json({ message: "Hello, World! Backend is working!" });
};
