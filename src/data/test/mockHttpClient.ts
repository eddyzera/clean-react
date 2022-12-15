// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/httpPostClient'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  async post (params: HttpPostParams): Promise<void> {
    const { url, body } = params
    this.url = url
    this.body = body
    return Promise.resolve()
  }
}
