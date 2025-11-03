import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a recipe parser. Extract recipe information from text and return JSON with: title, servings, prepTime, cookTime, ingredients (array), instructions (array), tags (array of dietary tags like vegan, gluten-free, etc), and notes.',
        },
        {
          role: 'user',
          content: `Parse this recipe:\n\n${text}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    })

    const content = response.choices[0].message.content || '{}'
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    const recipe = jsonMatch ? JSON.parse(jsonMatch[0]) : {}

    // Ensure arrays
    recipe.ingredients = recipe.ingredients || []
    recipe.instructions = recipe.instructions || []
    recipe.tags = recipe.tags || []

    return NextResponse.json({ recipe })
  } catch (error: any) {
    console.error('Recipe parsing error:', error)
    return NextResponse.json(
      { error: error.message || 'Recipe parsing failed' },
      { status: 500 }
    )
  }
}
