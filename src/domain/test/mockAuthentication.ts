import faker from 'faker'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthenticationParams } from '@/domain/usecases/authentication'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
