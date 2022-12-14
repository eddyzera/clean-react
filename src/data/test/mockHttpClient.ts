// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpPostClient, HttpPostParams } from 'data/protocols/http/httpPostClient'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  async post (params: HttpPostParams): Promise<void> {
    const { url } = params
    this.url = url
    return Promise.resolve()
  }
}
