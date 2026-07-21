import { Form, Input, Select, Button } from 'antd'
import { Controller } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'
import type { UserFormValues } from '../../validators/user.schema'
import { DEPARTMENT_OPTIONS, ROLE_OPTIONS, STATUS_OPTIONS } from '../../constants/user.constants'

interface UserFormProps {
  form: UseFormReturn<UserFormValues>
  onSubmit: (data: UserFormValues) => void
  editingId?: number
  submitting: boolean
  onCancel: () => void
  mode: 'create' | 'edit'
}

const departmentOpts = DEPARTMENT_OPTIONS.filter((o) => o.value !== 'ALL')
const roleOpts = ROLE_OPTIONS.filter((o) => o.value !== 'ALL')
const statusOpts = STATUS_OPTIONS.filter((o) => o.value !== 'ALL')

export function UserForm({ form, onSubmit, submitting, onCancel, mode }: UserFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="usr-form" noValidate>
      <Form.Item
        label="First Name"
        required
        validateStatus={errors.firstName ? 'error' : ''}
        help={errors.firstName?.message}
      >
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <Input {...field} id="user-first-name" placeholder="Enter first name" size="large" />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Last Name"
        required
        validateStatus={errors.lastName ? 'error' : ''}
        help={errors.lastName?.message}
      >
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <Input {...field} id="user-last-name" placeholder="Enter last name" size="large" />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Employee ID"
        required
        validateStatus={errors.employeeId ? 'error' : ''}
        help={errors.employeeId?.message}
      >
        <Controller
          name="employeeId"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="user-employee-id"
              placeholder="EMP-XXXX"
              size="large"
              disabled={mode === 'edit'}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Email"
        required
        validateStatus={errors.email ? 'error' : ''}
        help={errors.email?.message}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input {...field} id="user-email" placeholder="Enter email address" size="large" />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Phone"
        validateStatus={errors.phone ? 'error' : ''}
        help={errors.phone?.message}
      >
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input {...field} id="user-phone" placeholder="Enter phone number" size="large" />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Department"
        required
        validateStatus={errors.department ? 'error' : ''}
        help={errors.department?.message}
      >
        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <Select {...field} id="user-department" placeholder="Select department" options={departmentOpts} size="large" />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Role"
        required
        validateStatus={errors.role ? 'error' : ''}
        help={errors.role?.message}
      >
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select {...field} id="user-role" placeholder="Select role" options={roleOpts} size="large" />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Status"
        required
        validateStatus={errors.status ? 'error' : ''}
        help={errors.status?.message}
      >
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select {...field} id="user-status" placeholder="Select status" options={statusOpts} size="large" />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Notes"
        validateStatus={errors.notes ? 'error' : ''}
        help={errors.notes?.message}
      >
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <Input.TextArea {...field} id="user-notes" rows={3} placeholder="Enter notes (optional)" size="large" />
          )}
        />
      </Form.Item>

      <div className="usr-form-actions">
        <Button onClick={onCancel} disabled={submitting} size="large" id="usr-form-cancel-btn">
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={submitting}
          size="large"
          id="usr-form-submit-btn"
        >
          {mode === 'create' ? 'Create User' : 'Update User'}
        </Button>
      </div>
    </form>
  )
}
