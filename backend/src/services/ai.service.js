const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini API
// You'll need to add GEMINI_API_KEY to your .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generates summary, detailed summary, and bullet points for a note content
 * @param {string} content - The note content to summarize
 * @returns {Promise<{summary: string, detailedSummary: string, bulletPoints: string[]}>}
 */
exports.generateSummary = async (content) => {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Generate a concise summary (1-2 sentences)
    const summaryPrompt = `
      Please provide a concise summary (1-2 sentences) of the following text:
      
      ${content.substring(0, 10000)} // Limiting content to avoid token limits
    `;
    
    const summaryResponse = await model.generateContent(summaryPrompt);
    const summary = summaryResponse.response.text().trim();
    
    // Generate a more detailed summary (paragraph)
    const detailedPrompt = `
      Please provide a detailed summary (1 paragraph, around 5-6 sentences) of the following text:
      
      ${content.substring(0, 10000)}
    `;
    
    const detailedResponse = await model.generateContent(detailedPrompt);
    const detailedSummary = detailedResponse.response.text().trim();
    
    // Generate bullet points (key takeaways)
    const bulletPrompt = `
      Please extract 4-6 key points from the following text as bullet points. Each bullet point should be a single sentence:
      
      ${content.substring(0, 10000)}
    `;
    
    const bulletResponse = await model.generateContent(bulletPrompt);
    const bulletText = bulletResponse.response.text().trim();
    
    // Process bullet points - Extract the actual bullet points from the response
    // The response might be in a format like:
    // - Point 1
    // - Point 2
    // We need to extract just the text after the bullet/dash/asterisk
    let bulletPoints = bulletText.split('\n')
      .filter(line => line.trim().length > 0) // Remove empty lines
      .map(line => {
        // Remove bullet point marker and trim
        return line.replace(/^[\s•\-\*]+/, '').trim();
      })
      .filter(point => point.length > 0); // Remove any empty points after processing
    
    return {
      summary,
      detailedSummary,
      bulletPoints
    };
  } catch (error) {
    console.error('Error generating summary with Gemini API:', error);
    throw new Error('Failed to generate summary. AI service error.');
  }
};