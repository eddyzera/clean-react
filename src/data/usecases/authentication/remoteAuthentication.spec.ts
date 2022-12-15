// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { mockAuthentication } from '@/domain/test/mockAuthentication'
import faker from 'faker'
import { HttpPostClientSpy } from '@/data/test/mockHttpClient'
import { RemoteAuthentication } from '@/data/usecases/authentication/remoteAuthentication'
import { InvalidCredentialsError } from '@/domain/errors/invalidCredentialsError'
import { HttpStatusCode } from '@/data/protocols/http/httpResponse'

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

  it('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const params = mockAuthentication()
    const promise = sut.auth(params)
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
