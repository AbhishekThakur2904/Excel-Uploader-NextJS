import mongoose, { Schema, Document } from "mongoose";

interface IExcelData extends Document {
  data: any[];
  uploadedAt: Date;
}

const ExcelSchema = new Schema({
  data: { type: Array, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export const ExcelData = mongoose.model<IExcelData>("ExcelData", ExcelSchema);
