import faker from 'faker'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpPostParams } from '../protocols/http'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
