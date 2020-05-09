import React from 'react'
import { Button, TextField } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'

type Inputs = {
  email: string
  firstName: string
  lastName: string
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
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>氏名</h3>
      <Controller
        as={
          <TextField
            label="姓"
            error={!!errors?.firstName}
            variant="outlined"
            margin="dense"
            helperText={errors?.firstName?.message || '10文字以内'}
          />
        }
        name="firstName"
        control={control}
        defaultValue=""
        rules={{ required: '必須です。' }}
      />{' '}
      <Controller
        as={
          <TextField
            label="名"
            error={!!errors?.lastName}
            variant="outlined"
            margin="dense"
            helperText={errors?.lastName?.message || '10文字以内'}
          />
        }
        name="lastName"
        control={control}
        defaultValue=""
        rules={{ required: '必須です。' }}
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
