import { BaseApiService } from "./ApiService"

export class MemberBankAccountService extends BaseApiService {
  path = "MemberBankAccountService"

  async getList(page = 1, limit = 10) {
    return await this.get("", { page, limit })
  }

  async create(payload: any) {
    return await this.post("", payload)
  }

  async update(id: number, payload: any) {
    return await this.put(`${id}`, payload)
  }

  async delete(id: number) {
    return await super.delete(id)
  }

  async getById(id: number) {
    return await this.get(String(id))
  }
}
