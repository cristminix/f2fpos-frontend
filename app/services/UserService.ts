import { BaseApiService } from "./ApiService"

export class UserService extends BaseApiService {
  path = "UserService"

  async getList(page = 1, limit = 10) {
    return await this.get("", { page, limit })
  }

  async create(payload: any) {
    return await this.post("", payload)
  }

  async update(id: number, payload: any) {
    return await this.put(`${id}`, payload)
  }
}
