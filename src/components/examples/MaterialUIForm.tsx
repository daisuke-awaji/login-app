import React from 'react'
import { Button, TextField, Checkbox } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'

type Inputs = {
  email: string
  firstName: string
  lastName: string
}

interface IBaseDesignedFormProps {
  name: string
  label: string
  helperText?: string
  defaultValue?: unknown
  rules: any
  errors: any
  control: any
}
function BaseDesignedForm(props: IBaseDesignedFormProps) {
  const {
    name,
    label,
    helperText,
    defaultValue,
    rules,
    errors,
    control,
  } = props

  return (
    <Controller
      as={
        <TextField
          label={label}
          error={!!errors[name]}
          variant="outlined"
          margin="dense"
          helperText={errors[name]?.message || helperText}
        />
      }
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
    />
  )
}

function MaterialUiForm() {
  const { handleSubmit, control, errors, setError } = useForm<Inputs>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const onSubmit = (data: Object) => {
    console.log(data)
    // サーバサイドエラーを判断してエラーを表示する
    setError('firstName', 'alreadyExist', 'すでに登録されているユーザです。')
    setError('lastName', 'alreadyExist', 'すでに登録されているユーザです。')
    setError(
      'lastName',
      'longMessage',
      'ものすごく長いエラーメッセージのサンプルです。フォームのレイアウトが崩れないことを確認しましょう。',
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>氏名</h3>
      <BaseDesignedForm
        name="firstName"
        label="姓"
        helperText="10文字以内"
        rules={{ required: '必須です。' }}
        errors={errors}
        control={control}
      />{' '}
      <BaseDesignedForm
        name="lastName"
        label="名"
        helperText="10文字以内"
        rules={{ required: '必須です。' }}
        errors={errors}
        control={control}
      />{' '}
      <br />
      <Controller
        as={
          <Checkbox
            defaultChecked
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        }
        name="isOwner"
        control={control}
      />
      <Controller
        as={
          <Button color="primary">
            <span>保存</span>
          </Button>
        }
        name="submit"
        control={control}
        defaultValue=""
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  )
}

export default MaterialUiForm
