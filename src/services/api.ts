import axios from 'axios'
import { IUser } from '../types/types'

const fakeApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export async function fetchUsers() {
  const { data } = await fakeApi<IUser[]>(`/users`)
  return data
}

export async function removeUser(userId: number | undefined) {
  const { data } = await fakeApi.delete<IUser>(`/users/${userId}`)
  return data
}

export async function updateUser(userId: number | undefined, body: IUser) {
  const { data } = await fakeApi.put<IUser>(`/users/${userId}`, body)
  return data
}
