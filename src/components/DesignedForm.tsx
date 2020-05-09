import React from 'react'
import { useForm } from 'react-hook-form'

type Inputs = {
  email: string
  firstName: string
  lastName: string
}

function DesignedForm() {
  // const { register, handleSubmit, watch, errors } = useForm<Inputs>({
  const { register, handleSubmit, errors } = useForm<Inputs>({ mode: 'onBlur' })
  const onSubmit = (data: any) => console.log(data)

  // console.log(watch('user')) // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      氏名（姓）:{' '}
      <input name="firstName" ref={register({ required: '必須です。' })} />{' '}
      {errors?.firstName?.message}
      <br />
      氏名（名）:{' '}
      <input name="lastName" ref={register({ required: '必須です。' })} />{' '}
      {errors?.lastName?.message}
      <br />
      メールアドレス:{' '}
      <input name="email" ref={register({ required: '必須です。' })} />{' '}
      {errors?.email?.message}
      <br />
    </form>
  )
}

export default DesignedForm
