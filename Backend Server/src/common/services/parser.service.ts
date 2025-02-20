import ExcelJS from "exceljs";

/**
 * Parse an Excel file and return an array of its data.
 * @param filePath The path to the Excel file to parse.
 * @returns An array of arrays, where each subarray is a row in the spreadsheet.
 */
export const parseExcel = async (filePath: string): Promise<any[]> => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.worksheets[0]; 
  const excelData: any[] = [];

  worksheet.eachRow((row, rowNumber) => {
    const rowData = row.values; 
    console.log(`Row ${rowNumber}:`, rowData); 
    excelData.push(rowData);
  });

  return excelData;
};
