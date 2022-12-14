// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { mockAuthentication } from '../../../domain/test/mockAuthentication'
import faker from 'faker'
import { HttpPostClientSpy } from '../../test/mockHttpClient'
import { RemoteAuthentication } from './remoteAuthentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}
describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  it('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const params = mockAuthentication()
    await sut.auth(params)
    expect(httpPostClientSpy.body).toEqual(params)
  })
})
