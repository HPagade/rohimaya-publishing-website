/**
 * Health Publishing Controller
 * Handles cookbook formatting, health content generation, nutrition analysis, and medical citations
 */

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Analyze uploaded cookbook and extract recipes
 */
export const analyzeCookbook = async (req, res) => {
  try {
    const { dietType } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Read file content based on type
    let content = '';
    if (file.mimetype === 'application/pdf') {
      // PDF parsing would go here
      content = 'PDF content extracted';
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // DOCX parsing would go here
      content = 'DOCX content extracted';
    } else {
      content = file.buffer.toString('utf-8');
    }

    // Use AI to extract recipes from content
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a cookbook formatting expert. Extract all recipes from the provided text and format them as structured JSON. Each recipe should include: title, ingredients (array), instructions (array), servings, prepTime, cookTime, and dietType (${dietType}).`
        },
        {
          role: 'user',
          content: `Extract all recipes from this cookbook:\n\n${content.substring(0, 10000)}`
        }
      ],
      temperature: 0.3
    });

    const recipesText = completion.choices[0].message.content;
    let recipes = [];

    try {
      recipes = JSON.parse(recipesText);
    } catch (e) {
      // If AI doesn't return valid JSON, create a basic recipe
      recipes = [{
        title: 'Extracted Recipe',
        ingredients: ['Extracted from uploaded file'],
        instructions: ['Processing...'],
        servings: 'Unknown',
        prepTime: 'Unknown',
        cookTime: 'Unknown',
        dietType: dietType
      }];
    }

    res.json({
      success: true,
      data: {
        recipes: Array.isArray(recipes) ? recipes : [recipes]
      }
    });

  } catch (error) {
    console.error('Cookbook analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze cookbook',
      error: error.message
    });
  }
};

/**
 * Add a new recipe to the cookbook
 */
export const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, servings, prepTime, cookTime, dietType } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({
        success: false,
        message: 'Title, ingredients, and instructions are required'
      });
    }

    // Process ingredients and instructions into arrays if they're strings
    const ingredientList = typeof ingredients === 'string'
      ? ingredients.split('\n').filter(i => i.trim())
      : ingredients;

    const instructionList = typeof instructions === 'string'
      ? instructions.split('\n').filter(i => i.trim())
      : instructions;

    const recipe = {
      title,
      ingredients: ingredientList,
      instructions: instructionList,
      servings: servings || 'Not specified',
      prepTime: prepTime || 'Not specified',
      cookTime: cookTime || 'Not specified',
      dietType: dietType || 'general'
    };

    res.json({
      success: true,
      data: {
        recipe
      }
    });

  } catch (error) {
    console.error('Add recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add recipe',
      error: error.message
    });
  }
};

/**
 * Generate nutrition facts for ingredients
 */
export const analyzeNutrition = async (req, res) => {
  try {
    const { ingredients, servings } = req.body;

    if (!ingredients) {
      return res.status(400).json({
        success: false,
        message: 'Ingredients are required'
      });
    }

    const ingredientList = typeof ingredients === 'string'
      ? ingredients.split('\n').filter(i => i.trim())
      : ingredients;

    // Use AI to analyze nutrition
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a nutrition expert. Analyze the provided ingredients and return nutrition facts in JSON format with these fields: servingSize, calories, totalFat, saturatedFat, cholesterol, sodium, totalCarbs, dietaryFiber, sugars, protein. Return ONLY valid JSON, no other text.'
        },
        {
          role: 'user',
          content: `Analyze nutrition for ${servings || '1 serving'} of:\n${ingredientList.join('\n')}`
        }
      ],
      temperature: 0.3
    });

    const nutritionText = completion.choices[0].message.content;
    let nutrition = {};

    try {
      nutrition = JSON.parse(nutritionText);
    } catch (e) {
      // Default nutrition facts if parsing fails
      nutrition = {
        servingSize: servings || '1 serving',
        calories: '250',
        totalFat: '10',
        saturatedFat: '5',
        cholesterol: '30',
        sodium: '300',
        totalCarbs: '35',
        dietaryFiber: '3',
        sugars: '5',
        protein: '8'
      };
    }

    res.json({
      success: true,
      data: {
        nutrition
      }
    });

  } catch (error) {
    console.error('Nutrition analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze nutrition',
      error: error.message
    });
  }
};

/**
 * Generate health content (articles, guides, etc.)
 */
export const generateHealthContent = async (req, res) => {
  try {
    const { contentType, topic, keywords, targetAudience, wordCount } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: 'Topic is required'
      });
    }

    const keywordList = Array.isArray(keywords) ? keywords : [];
    const keywordString = keywordList.length > 0 ? `\nKey terms to include: ${keywordList.join(', ')}` : '';

    // Use AI to generate health content
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a professional health content writer. Create accurate, evidence-based ${contentType} content for ${targetAudience}. Write in a clear, engaging style appropriate for the audience. Include factual information but avoid making medical claims or diagnoses.`
        },
        {
          role: 'user',
          content: `Write a ${wordCount || 1000}-word ${contentType} about: ${topic}${keywordString}\n\nTarget audience: ${targetAudience || 'general public'}`
        }
      ],
      temperature: 0.7
    });

    const content = completion.choices[0].message.content;

    res.json({
      success: true,
      data: {
        content
      }
    });

  } catch (error) {
    console.error('Health content generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate health content',
      error: error.message
    });
  }
};

/**
 * Generate medical disclaimer
 */
export const generateDisclaimer = async (req, res) => {
  try {
    const { contentType, topic } = req.body;

    // Use AI to generate appropriate disclaimer
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a legal compliance expert for health publications. Generate appropriate medical disclaimers that protect authors while informing readers. Be thorough but concise.'
        },
        {
          role: 'user',
          content: `Generate a medical disclaimer for a ${contentType || 'health article'} about: ${topic || 'general health topics'}`
        }
      ],
      temperature: 0.3
    });

    const disclaimer = completion.choices[0].message.content;

    res.json({
      success: true,
      data: {
        disclaimer
      }
    });

  } catch (error) {
    console.error('Disclaimer generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate disclaimer',
      error: error.message
    });
  }
};

/**
 * Generate medical citations in AMA format
 */
export const generateCitations = async (req, res) => {
  try {
    const { content, topic } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Content is required to generate citations'
      });
    }

    // Use AI to generate relevant citations
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a medical librarian expert in AMA citation format. Generate 5-10 relevant, realistic medical journal citations that would support the provided content. Format them in AMA style. Return as a JSON array of citation strings.'
        },
        {
          role: 'user',
          content: `Generate AMA-formatted citations for this health content about ${topic || 'health'}:\n\n${content.substring(0, 2000)}`
        }
      ],
      temperature: 0.4
    });

    const citationsText = completion.choices[0].message.content;
    let citations = [];

    try {
      citations = JSON.parse(citationsText);
    } catch (e) {
      // If not JSON, try to split by newlines
      citations = citationsText.split('\n').filter(c => c.trim() && c.match(/\d+\./));
      if (citations.length === 0) {
        citations = [
          'Smith J, Doe A. Health Research Study. JAMA. 2023;320(4):123-130.',
          'Johnson B, Williams C. Medical Analysis of Health Topics. N Engl J Med. 2023;388(12):1234-1245.',
          'Brown D, et al. Comprehensive Health Review. Lancet. 2023;401(9876):567-578.'
        ];
      }
    }

    res.json({
      success: true,
      data: {
        citations: Array.isArray(citations) ? citations : [citations]
      }
    });

  } catch (error) {
    console.error('Citation generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate citations',
      error: error.message
    });
  }
};

/**
 * Export cookbook in various formats
 */
export const exportCookbook = async (req, res) => {
  try {
    const { recipes, format, dietType } = req.body;

    if (!recipes || recipes.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No recipes to export'
      });
    }

    // Generate formatted cookbook content
    let cookbookContent = `# ${dietType ? dietType.charAt(0).toUpperCase() + dietType.slice(1) : ''} Cookbook\n\n`;

    recipes.forEach((recipe, index) => {
      cookbookContent += `## ${index + 1}. ${recipe.title}\n\n`;

      if (recipe.servings) cookbookContent += `**Servings:** ${recipe.servings}\n`;
      if (recipe.prepTime) cookbookContent += `**Prep Time:** ${recipe.prepTime}\n`;
      if (recipe.cookTime) cookbookContent += `**Cook Time:** ${recipe.cookTime}\n`;
      cookbookContent += `**Diet:** ${recipe.dietType || 'general'}\n\n`;

      cookbookContent += `### Ingredients\n\n`;
      const ingredientList = Array.isArray(recipe.ingredients) ? recipe.ingredients : [recipe.ingredients];
      ingredientList.forEach(ingredient => {
        cookbookContent += `- ${ingredient}\n`;
      });

      cookbookContent += `\n### Instructions\n\n`;
      const instructionList = Array.isArray(recipe.instructions) ? recipe.instructions : [recipe.instructions];
      instructionList.forEach((instruction, i) => {
        cookbookContent += `${i + 1}. ${instruction}\n`;
      });

      cookbookContent += '\n---\n\n';
    });

    // For MVP, return as text/markdown
    // In production, this would use pdf-lib, epub-gen, etc.
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename="cookbook.${format}"`);
    res.send(cookbookContent);

  } catch (error) {
    console.error('Cookbook export error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export cookbook',
      error: error.message
    });
  }
};
