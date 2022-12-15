/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/httpPostClient'
import { HttpResponse, HttpStatusCode } from '@/data/protocols/http/httpResponse'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse> {
    const { url, body } = params
    this.url = url
    this.body = body
    return Promise.resolve(this.response)
  }
}
