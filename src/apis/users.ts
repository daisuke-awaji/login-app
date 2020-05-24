// mock

import { IUser } from 'components/users/IUser'
import { sleep } from './utils'

export const users: IUser[] = [
  {
    id: '0342a27b-e1f8-456b-8bc8-8e7cff1f4d9a',
    name: 'janedoe_',
    email: 'usera@email.com',
    type: 'admin',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit📷✈️🏕️',
    img:
      'https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces',
  },
  {
    id: '101dfbc1-5384-44f2-8628-f2399b46fdd6',
    name: 'Muhammed Erdem',
    email: 'userb@email.com',
    type: 'default',
    img:
      'https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg',
  },
]

export const fetchUser = async (userId: string): Promise<IUser> => {
  await sleep(1000)
  return new Promise<IUser>((resolve, reject) => {
    const one = users.find((user) => user.id === userId)
    if (!one) {
      reject('error')
    }
    resolve(one)
  })
}

export const fetchUsers = (): Promise<IUser[]> => {
  return new Promise((resolve) => {
    resolve(users)
  })
}
