import { BaseApiService } from "./ApiService"

export class ProductCategoryService extends BaseApiService {
  path = "ProductCategoryService"

  async create(data: { name: string; outletId: number }) {
    return await this.post("", data)
  }

  async getList() {
    return await this.get()
  }
}
