// mock

import { IUser } from 'components/users/IUser'

export const users: IUser[] = [
  {
    id: 100895432023,
    name: 'janedoe_',
    email: 'usera@email.com',
    type: 'admin',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit📷✈️🏕️',
    img:
      'https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces',
  },
  {
    id: 450982843206,
    name: 'Muhammed Erdem',
    email: 'userb@email.com',
    type: 'default',
    img:
      'https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg',
  },
]

export const fetchUser = (userId: number): Promise<IUser> => {
  return new Promise<IUser>((resolve, reject) => {
    const one = users.find((user) => user.id === Number(userId))
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
