import React from 'react'
import { useForm } from 'react-hook-form'

type Inputs = {
  email: string
  firstName: string
  lastName: string
}

function SimpleForm() {
  // const { register, handleSubmit, watch, errors } = useForm<Inputs>({
  const { register, handleSubmit, errors } = useForm<Inputs>({
    // onSubmit, onBlur, onChangeが選択可能。onChangeはパフォーマンスの悪い習慣だと考えられているため非推奨。
    // onBlurくらいがユーザ体験として良い気がする。
    mode: 'onBlur',
    reValidateMode: 'onChange',
    // ここで設定もできるが、ここのinputタグでdefaultValueを設定したほうが可読性が良さそう
    defaultValues: {},
    // 次のメジャーバージョンで非推奨になるらしい。使用しない。
    // Yupを使用してバリデーションできるらしい。
    validationSchema: undefined, // Note: will be deprecated in the next major version with validationResolver
    validationResolver: undefined,
    validationContext: undefined,
    // first Error または all が選択可能
    // エラーとなったメッセージをいくつ表示するか
    validateCriteriaMode: 'all',
    submitFocusError: true,
  })
  const onSubmit = (data: any) => console.log(data)

  // console.log(watch('user')) // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      userFirstName:{' '}
      <input
        name="firstName"
        defaultValue=""
        ref={register({
          required: 'This field is required',
          maxLength: {
            value: 10,
            message: 'This field is less than 10 characters',
          },
          minLength: {
            value: 3,
            message: 'This field must be at least 3 characters long',
          },
          pattern: {
            value: /[A-Za-z]{3}/,
            message: 'pattern must be /[A-Za-z]{3}/',
          },
          // カスタムバリデーションはこんな感じで
          // validate: (value) => {
          //   console.log(value)
          //   return value === '1'
          // },
        })}
      />{' '}
      {errors?.firstName?.message}
      {console.log(errors.firstName)}
      <br />
      {/* include validation with required or other standard HTML validation rules */}
      email: <input name="email" ref={register({ required: true })} /> <br />
      {/* errors will return when field validation fails  */}
      {errors.email && <span>This field is required</span>}
      <input type="submit" />
    </form>
  )
}

export default SimpleForm
