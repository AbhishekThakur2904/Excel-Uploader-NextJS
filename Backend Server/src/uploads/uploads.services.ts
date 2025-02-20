import { ExcelData } from "./uploads.schema";
import { parseExcel } from "../common/services/parser.service";
import { ExcelDataDTO } from "./upload.dto";

/**
 * Processes an Excel file by parsing its contents and storing the data in the database.
 * @param filePath - The path to the Excel file to be processed.
 * @returns A promise that resolves to an ExcelDataDTO containing the parsed data and the upload timestamp.
 * @throws An error if the file cannot be parsed or the data cannot be stored.
 */

export const processAndStoreExcel = async (filePath: string): Promise<ExcelDataDTO> => {
  const data = await parseExcel(filePath);

  console.log("Parsed Excel Data:", data); 

  const newExcelEntry = new ExcelData({ data });
  await newExcelEntry.save();

  return { data, uploadedAt: new Date() };
};
