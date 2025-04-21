require('dotenv').config();
const OpenAI = require('openai');

// Check if OpenAI API key is available
let openai;
try {
  // Initialize OpenAI with your API key
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY not found in environment variables, will use fallback summarization");
  } else {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
} catch (error) {
  console.error("Error initializing OpenAI client:", error);
}

/**
 * Generate summaries for a given text using OpenAI's model
 * @param {string} content - The note content to summarize
 * @returns {Promise<Object>} - Object containing different summary formats
 */
exports.generateAISummary = async (content) => {
  try {
    // Check if OpenAI is available
    if (!openai) {
      console.log("OpenAI client not available, using fallback summarization");
      throw new Error("OpenAI client not initialized");
    }

    console.log("Initializing OpenAI API...");
    
    // Truncate content if it's too long (for token limits)
    const truncatedContent = content.length > 10000 
      ? content.substring(0, 10000) + '...'
      : content;
    
    console.log("Content length:", content.length, "Truncated:", truncatedContent.length < content.length);
    
    // Generate all summaries in a single prompt to save on API calls
    const prompt = `
    Please summarize the following text in three different formats:
    
    1. Concise summary (3 sentences max)
    2. Detailed summary (5-7 sentences)
    3. 5 bullet points capturing the key information
    
    Respond in JSON format with keys "conciseSummary", "detailedSummary", and "bulletPoints" (as an array).
    
    TEXT TO SUMMARIZE:
    ${truncatedContent}
    `;
    
    console.log("Sending request to OpenAI API...");
    
    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using the model you specified
      messages: [
        { role: "system", content: "You are a helpful assistant that summarizes text accurately." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3, // Lower temperature for more concise, predictable output
      max_tokens: 1000, // Adjust based on expected summary length
      response_format: { type: "json_object" }
    });
    
    // Parse the response
    const responseContent = response.choices[0].message.content.trim();
    let result;
    
    try {
      result = JSON.parse(responseContent);
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      // If parsing fails, extract text using regex
      const conciseMatch = responseContent.match(/conciseSummary["\s:]+([^"]+)/);
      const detailedMatch = responseContent.match(/detailedSummary["\s:]+([^"]+)/);
      const bulletMatch = responseContent.match(/bulletPoints["\s:]+\[(.*?)\]/s);
      
      result = {
        conciseSummary: conciseMatch ? conciseMatch[1].trim() : createBasicSummary(truncatedContent, 2),
        detailedSummary: detailedMatch ? detailedMatch[1].trim() : createBasicSummary(truncatedContent, 5),
        bulletPoints: bulletMatch ? 
          bulletMatch[1].split(',').map(item => item.replace(/["\\]/g, '').trim()) : 
          createBasicBulletPoints(truncatedContent)
      };
    }
    
    // Ensure all properties exist
    result.conciseSummary = result.conciseSummary || createBasicSummary(truncatedContent, 2);
    result.detailedSummary = result.detailedSummary || createBasicSummary(truncatedContent, 5);
    result.bulletPoints = result.bulletPoints || createBasicBulletPoints(truncatedContent);
    
    // Ensure bulletPoints is an array
    if (!Array.isArray(result.bulletPoints)) {
      result.bulletPoints = createBasicBulletPoints(truncatedContent);
    }
    
    console.log("Successfully generated summaries from OpenAI.");
    
    return {
      conciseSummary: result.conciseSummary,
      detailedSummary: result.detailedSummary,
      bulletPoints: result.bulletPoints
    };
  } catch (error) {
    console.error('Error generating AI summary:', error);
    
    // Fallback to basic summary if AI fails
    console.log("Using fallback summarization method");
    return {
      conciseSummary: createBasicSummary(content, 2),
      detailedSummary: createBasicSummary(content, 5),
      bulletPoints: createBasicBulletPoints(content)
    };
  }
};

/**
 * Create a basic summary as fallback when AI fails
 * @param {string} content - The text to summarize
 * @param {number} sentenceCount - Number of sentences to include
 * @returns {string} - A basic summary
 */
function createBasicSummary(content, sentenceCount) {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  return sentences.slice(0, Math.min(sentenceCount, sentences.length)).join('. ') + 
    (sentences.length > 0 ? '.' : '');
}

/**
 * Create basic bullet points as fallback when AI fails
 * @param {string} content - The text to extract bullet points from
 * @returns {Array<string>} - Array of bullet points
 */
function createBasicBulletPoints(content) {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  return sentences
    .slice(0, Math.min(5, sentences.length))
    .map(s => s.trim())
    .filter(s => s.length > 10);
}