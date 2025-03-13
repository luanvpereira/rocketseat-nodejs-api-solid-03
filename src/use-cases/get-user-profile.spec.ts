import { beforeEach, describe, expect, test } from 'vitest'
import { hash } from 'bcryptjs'

import { GetUserProfile } from './get-user-profile'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFound } from './errors/resource-not-found'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfile

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfile(usersRepository)
  })

  test('should be able to get user profile', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({ id: 'user-1' })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  test('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({ id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
