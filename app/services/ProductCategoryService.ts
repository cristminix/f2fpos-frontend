import { BaseApiService } from "./ApiService"

export class ProductCategoryService extends BaseApiService {
  path = "ProductCategoryService"

  async getList() {
    return await this.get()
  }
}
