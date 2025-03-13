import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'

interface GetUserProfileRequest {
  id: string
}

interface GetUserProfileResponse {
  user: User
}

export class GetUserProfile {
  // eslint-disable-next-line no-useless-constructor
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotFound()
    }

    return {
      user,
    }
  }
}
