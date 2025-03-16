import { beforeEach, describe, expect, test } from 'vitest'

import { CreateGymUseCase } from './create-gym'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-users-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  test('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -23.5715569,
      longitude: -46.5644216,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
