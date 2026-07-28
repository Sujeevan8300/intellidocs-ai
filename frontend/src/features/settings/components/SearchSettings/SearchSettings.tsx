import { Form, InputNumber, Switch, Slider, Card } from 'antd'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { ISearchSettings } from '../../types/SearchSettings'
import styles from '../../styles/settings.module.css'

interface SearchSettingsProps {
  form: UseFormReturn<ISearchSettings>
}

export function SearchSettings({ form }: SearchSettingsProps) {
  const { control, watch, formState: { errors } } = form
  const similarityThreshold = watch('similarityThreshold')

  return (
    <div className={styles.formRow}>
      <Card className={styles.sectionCard} title="Search Defaults">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="defaultLimit" control={control} render={({ field }) => (
              <Form.Item label="Default Result Limit" required help={errors.defaultLimit?.message || "Number of results returned per search query"}>
                <InputNumber {...field} min={1} max={100} style={{ width: '100%' }} />
              </Form.Item>
            )} />
            <Controller name="searchTimeout" control={control} render={({ field }) => (
              <Form.Item label="Search Timeout (seconds)" required help={errors.searchTimeout?.message || "Maximum wait time for search results"}>
                <InputNumber {...field} min={5} max={120} style={{ width: '100%' }} />
              </Form.Item>
            )} />
          </div>
          <Controller name="similarityThreshold" control={control} render={({ field }) => (
            <Form.Item label={`Similarity Threshold: ${similarityThreshold}`} help={errors.similarityThreshold?.message || "Minimum similarity score for a result to be included (0 = no filter, 1 = exact match only)"}>
              <Slider {...field} min={0} max={1} step={0.05} />
            </Form.Item>
          )} />
        </Form>
      </Card>

      <Card className={styles.sectionCard} title="Search Features">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="highlightMatches" control={control} render={({ field }) => (
              <Form.Item label="Highlight Matches" valuePropName="checked"
                help="Highlight matching terms in search results">
                <Switch {...field} />
              </Form.Item>
            )} />
            <Controller name="enableSuggestions" control={control} render={({ field }) => (
              <Form.Item label="Enable Suggestions" valuePropName="checked"
                help="Show search suggestions as the user types">
                <Switch {...field} />
              </Form.Item>
            )} />
            <Controller name="enableRelatedQuestions" control={control} render={({ field }) => (
              <Form.Item label="Enable Related Questions" valuePropName="checked"
                help="Show related questions after search results">
                <Switch {...field} />
              </Form.Item>
            )} />
          </div>
        </Form>
      </Card>
    </div>
  )
}
