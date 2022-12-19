import axios from 'axios'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpPostParams } from '@/data/protocols/http'

export class AxiosHttpClient {
  async post (params: HttpPostParams<any>): Promise<void> {
    await axios.post(params.url, params.body)
  }
}
