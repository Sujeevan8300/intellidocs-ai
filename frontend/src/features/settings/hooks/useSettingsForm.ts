import { useCallback, useEffect } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SettingsSection, AllSettings } from '../types/SettingsState'
import {
  generalSchema, aiSchema, documentSchema, searchSchema, storageSchema,
  securitySchema, authenticationSchema, notificationSchema, appearanceSchema,
  brandingSchema, emailSchema, auditSchema,
} from '../validators/settings.schema'
import type {
  GeneralFormValues, AIFormValues, DocumentFormValues, SearchFormValues,
  StorageFormValues, SecurityFormValues, AuthenticationFormValues,
  NotificationFormValues, AppearanceFormValues, BrandingFormValues,
  EmailFormValues, AuditFormValues,
} from '../validators/settings.schema'

type AnyFormValues = Record<string, unknown>

const SECTION_SCHEMAS: Record<string, unknown> = {
  general: generalSchema,
  ai: aiSchema,
  documents: documentSchema,
  search: searchSchema,
  storage: storageSchema,
  security: securitySchema,
  authentication: authenticationSchema,
  notifications: notificationSchema,
  appearance: appearanceSchema,
  branding: brandingSchema,
  email: emailSchema,
  audit: auditSchema,
}

type SectionFormReturn =
  | UseFormReturn<GeneralFormValues>
  | UseFormReturn<AIFormValues>
  | UseFormReturn<DocumentFormValues>
  | UseFormReturn<SearchFormValues>
  | UseFormReturn<StorageFormValues>
  | UseFormReturn<SecurityFormValues>
  | UseFormReturn<AuthenticationFormValues>
  | UseFormReturn<NotificationFormValues>
  | UseFormReturn<AppearanceFormValues>
  | UseFormReturn<BrandingFormValues>
  | UseFormReturn<EmailFormValues>
  | UseFormReturn<AuditFormValues>

export function useSettingsForm(
  section: SettingsSection,
  defaultValues: AllSettings[SettingsSection],
): { form: SectionFormReturn; isDirty: boolean } {
  const schema = SECTION_SCHEMAS[section]

  const form = useForm({
    resolver: schema ? zodResolver(schema as never) : undefined,
    defaultValues: defaultValues as unknown as AnyFormValues,
    mode: 'onChange',
  })

  const resetForm = useCallback(() => {
    form.reset(defaultValues as unknown as AnyFormValues)
  }, [form, defaultValues])

  useEffect(() => {
    resetForm()
  }, [section, resetForm])

  return { form: form as unknown as SectionFormReturn, isDirty: form.formState.isDirty }
}
