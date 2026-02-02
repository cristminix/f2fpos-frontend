import { BaseApiService } from "./ApiService"

export class ProductCategoryImageService extends BaseApiService {
  path = "ProductCategoryImageService"

  async getListByProductCategoryId(productCategoryId: number, page = 1, limit = 10) {
    return await this.get("", { productCategoryId, page, limit })
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
