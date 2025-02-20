'use client';

import { motion } from 'framer-motion';
import React, { DragEvent, useCallback, useState } from 'react';
import { FiFile, FiLoader, FiUploadCloud, FiX } from 'react-icons/fi';

interface ExcelRow {
  [key: string]: string | number;
}

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<ExcelRow[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((selectedFile: File) => {
    if (!selectedFile.name.match(/\.(xlsx|xls)$/)) {
      setError('Please upload an Excel file ( .xlsx or .xls )');
      return false;
    }
    setFile(selectedFile);
    setError(null);
    return true;
  }, []);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && Array.isArray(data?.result?.data)) {
        setExcelData(data.result.data);
      } else {
        throw new Error(data.message || 'Error processing file');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
      setExcelData([]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-12 px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-4xl mx-auto'
      >
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-4'>
            Data Upload Portal
          </h1>
          <p className='text-gray-300 text-lg'>
            Upload your Excel files for instant analysis
          </p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 mb-8 transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-900/20'
              : 'border-gray-700 hover:border-blue-500'
          }`}
        >
          <div className='flex flex-col items-center space-y-4'>
            <FiUploadCloud className='w-12 h-12 text-blue-500' />
            <div className='text-center'>
              <label className='cursor-pointer'>
                <span className='text-blue-400 font-medium'>
                  Click to browse
                </span>
                <input
                  type='file'
                  accept='.xlsx, .xls'
                  onChange={handleFileChange}
                  className='hidden'
                />
              </label>
              <p className='text-gray-400 mt-2'>or drag and drop files here</p>
            </div>

            {file && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex items-center bg-gray-800 rounded-lg p-3 mt-4'
              >
                <FiFile className='text-blue-400 mr-2' />
                <span className='text-gray-300'>{file.name}</span>
                <button
                  onClick={() => setFile(null)}
                  className='ml-4 text-gray-400 hover:text-red-500'
                >
                  <FiX />
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-red-900/30 border border-red-400 text-red-300 px-4 py-3 rounded-lg mb-4'
          >
            {error}
          </motion.div>
        )}

        <div className='flex justify-center'>
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all ${
              uploading || !file
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {uploading && <FiLoader className='animate-spin mr-2' />}
            {uploading ? 'Processing...' : 'Analyze Data'}
          </button>
        </div>

        {excelData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='mt-12 w-full bg-gray-800 rounded-xl overflow-hidden shadow-xl'
          >
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gray-700'>
                  <tr>
                    {Object.keys(excelData[0]).map((header) => (
                      <th
                        key={header}
                        className='px-6 py-3 text-left text-sm font-medium text-gray-200 uppercase tracking-wider'
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-700'>
                  {excelData.map((row, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'
                      }
                    >
                      {Object.values(row).map((value, cellIndex) => (
                        <td
                          key={cellIndex}
                          className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default UploadPage;
