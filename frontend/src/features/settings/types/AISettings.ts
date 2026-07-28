export interface IAISettings {
  provider: string
  model: string
  temperature: number
  maxTokens: number
  topP: number
  streaming: boolean
  responseTimeout: number
  chatMemory: boolean
  defaultPrompt: string
}
