import { NextRequest, NextResponse } from 'next/server'
import { Mistral } from '@mistralai/mistralai'

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
})

const AGENT_ID = 'ag_019bc0529c8c70749ee22136fe48d793'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] }

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages requis' },
        { status: 400 }
      )
    }

    const inputs = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }))

    const response = await client.beta.conversations.start({
      agentId: AGENT_ID,
      inputs,
    })

    const assistantMessage = response.outputs?.find(
      (output) => (output as { type?: string; role?: string }).type === 'message' && (output as { role?: string }).role === 'assistant'
    )

    const reply = (assistantMessage as { content?: string })?.content || "Je n'ai pas pu générer de réponse."

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Erreur API Mistral:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la communication avec l\'assistant' },
      { status: 500 }
    )
  }
}
