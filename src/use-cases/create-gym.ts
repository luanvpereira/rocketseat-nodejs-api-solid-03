import { GymsRepository } from '@/repositories/gyms-repository'

import type { Gym } from '@prisma/client'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description: description as string,
      phone: phone as string,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
