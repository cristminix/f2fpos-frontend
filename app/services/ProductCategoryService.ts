import { BaseApiService } from "./ApiService"

export class ProductCategoryService extends BaseApiService {
  path = "ProductCategoryService"

  async getList(page = 1, limit = 10, sortField?: string, sortOrder?: string) {
    const params: Record<string, any> = { page, limit }
    if (sortField) {
      params.sortField = sortField
      params.sortOrder = sortOrder || "asc"
    }
    return await this.get("", params)
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
