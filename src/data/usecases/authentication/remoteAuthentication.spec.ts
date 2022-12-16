/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockAuccountModel, mockAuthentication } from '@/domain/test/mockAccount'
import faker from 'faker'
import { HttpPostClientSpy } from '@/data/test/mockHttpClient'
import { RemoteAuthentication } from '@/data/usecases/authentication/remoteAuthentication'
import { InvalidCredentialsError } from '@/domain/errors/invalidCredentialsError'
import { HttpStatusCode } from '@/data/protocols/http/httpResponse'
import { UnexpectedError } from '@/domain/errors/unexpectedError'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models/accountModel'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
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

  it('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const params = mockAuthentication()
    const promise = sut.auth(params)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverErro
    }
    const params = mockAuthentication()
    const promise = sut.auth(params)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const params = mockAuthentication()
    const promise = sut.auth(params)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAuccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const params = mockAuthentication()
    const account = await sut.auth(params)
    expect(account).toEqual(httpResult)
  })
})
