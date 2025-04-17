const { createWorker } = require('tesseract.js');

/**
 * Process an image using OCR to extract text
 * @param {Buffer} imageBuffer - The image buffer to process
 * @returns {Promise<string>} - The extracted text
 */
exports.processImage = async (imageBuffer) => {
  try {
    // Create a new worker
    const worker = await createWorker();
    
    // Initialize the worker with English language
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    
    // Process the image
    const { data: { text } } = await worker.recognize(imageBuffer);
    
    // Terminate the worker
    await worker.terminate();
    
    return text;
  } catch (error) {
    console.error('OCR Processing Error:', error);
    throw new Error('Failed to process image with OCR');
  }
};