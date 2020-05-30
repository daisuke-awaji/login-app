import { IUser } from 'components/users/IUser'
import { sleep } from './utils'

// mock
export let users: IUser[] = [
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
    name: 'Bob',
    email: 'userb@email.com',
    type: 'default',
    img:
      'https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg',
  },
  {
    id: 'b1a79255-caf8-4bd2-b238-c784454fb5b0',
    name: 'snowman',
    email: 'userc@email.com',
    type: 'default',
    description:
      'longtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtext',
    img:
      'https://pbs.twimg.com/profile_images/995611723850645504/BIjprphs_400x400.jpg',
  },
  {
    id: 'b56695d9-2e89-4a0a-9434-ebfac97bc778',
    name: 'd',
    email: 'userd@email.com',
    type: 'default',
    img: '',
  },
  {
    id: 'fca20c64-4c30-4cca-bd57-71fe091eb324',
    name: 'e',
    email: 'usere@email.com',
    type: 'default',
    img: '',
  },
  {
    id: '229625dd-a2cc-41b9-bf4b-98cb32d07e2d',
    name: 'f',
    email: 'userf@email.com',
    type: 'default',
    img: '',
  },
  {
    id: 'e2506be7-37a3-4228-b83e-4e345540d69e',
    name: 'g',
    email: 'userg@email.com',
    type: 'default',
    img: '',
  },
]

export const fetchUser = async (userId: string): Promise<IUser> => {
  await sleep(1000)
  return new Promise<IUser>((resolve, reject) => {
    const one = users.find((user) => user.id === userId)
    if (!one) {
      reject('user not found')
    }
    resolve(one)
  })
}

export const fetchUsers = (): Promise<IUser[]> => {
  return new Promise((resolve) => {
    resolve(users)
  })
}

export const updateUser = async (updateUser: IUser): Promise<IUser> => {
  await sleep(1000)
  return new Promise<IUser>((resolve, reject) => {
    users.forEach((user, index) => {
      if (user.id === updateUser.id) {
        users.splice(index, 1, updateUser)
        resolve(updateUser)
      }
    })
    reject('user not found')
  })
}
