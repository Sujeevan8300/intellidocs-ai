import { Form, Select, InputNumber, Switch, Slider, Input, Card } from 'antd'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { IAISettings } from '../../types/AISettings'
import { AI_PROVIDER_OPTIONS, AI_MODEL_OPTIONS } from '../../constants/settings.constants'
import styles from '../../styles/settings.module.css'

interface AISettingsProps {
  form: UseFormReturn<IAISettings>
}

export function AISettings({ form }: AISettingsProps) {
  const { control, watch, formState: { errors } } = form
  const temperature = watch('temperature')
  const topP = watch('topP')

  return (
    <div className={styles.formRow}>
      <Card className={styles.sectionCard} title="Model Configuration">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="provider" control={control} render={({ field }) => (
              <Form.Item label="AI Provider" required help={errors.provider?.message || "Select your AI service provider"}>
                <Select {...field} options={AI_PROVIDER_OPTIONS} />
              </Form.Item>
            )} />
            <Controller name="model" control={control} render={({ field }) => (
              <Form.Item label="Model Name" required help={errors.model?.message || "The AI model used for generating responses"}>
                <Select {...field} options={AI_MODEL_OPTIONS} />
              </Form.Item>
            )} />
          </div>
        </Form>
      </Card>

      <Card className={styles.sectionCard} title="Parameters">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="temperature" control={control} render={({ field }) => (
              <Form.Item label={`Temperature: ${temperature}`} help={errors.temperature?.message || "Higher values produce more creative responses, lower values are more focused"}>
                <Slider {...field} min={0} max={2} step={0.1} />
              </Form.Item>
            )} />
            <Controller name="topP" control={control} render={({ field }) => (
              <Form.Item label={`Top P: ${topP}`} help={errors.topP?.message || "Controls diversity via nucleus sampling"}>
                <Slider {...field} min={0} max={1} step={0.05} />
              </Form.Item>
            )} />
            <Controller name="maxTokens" control={control} render={({ field }) => (
              <Form.Item label="Max Tokens" required help={errors.maxTokens?.message || "Maximum number of tokens in the AI response"}>
                <InputNumber {...field} min={1} max={128000} style={{ width: '100%' }} />
              </Form.Item>
            )} />
            <Controller name="responseTimeout" control={control} render={({ field }) => (
              <Form.Item label="Response Timeout (seconds)" required help={errors.responseTimeout?.message || "Maximum wait time for an AI response"}>
                <InputNumber {...field} min={10} max={300} style={{ width: '100%' }} />
              </Form.Item>
            )} />
          </div>
          <div className={styles.formGrid}>
            <Controller name="streaming" control={control} render={({ field }) => (
              <Form.Item label="Streaming Enabled" valuePropName="checked">
                <Switch {...field} />
              </Form.Item>
            )} />
            <Controller name="chatMemory" control={control} render={({ field }) => (
              <Form.Item label="Chat Memory Enabled" valuePropName="checked"
                help="Retain conversation context across messages">
                <Switch {...field} />
              </Form.Item>
            )} />
          </div>
        </Form>
      </Card>

      <Card className={styles.sectionCard} title="Default Prompt Template">
        <Form layout="vertical">
          <Controller name="defaultPrompt" control={control} render={({ field }) => (
            <Form.Item help={errors.defaultPrompt?.message || "The system prompt used for all AI interactions by default"}>
              <Input.TextArea {...field} rows={6} placeholder="Enter the default system prompt..." />
            </Form.Item>
          )} />
        </Form>
      </Card>
    </div>
  )
}
