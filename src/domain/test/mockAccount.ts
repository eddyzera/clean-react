/* eslint-disable @typescript-eslint/no-unused-vars */
import faker from 'faker'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models/accountModel'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid()
})