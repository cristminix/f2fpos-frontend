import { BaseApiService } from "./ApiService";

export class ProductCategoryService extends BaseApiService {
  path = "ProductCategoryService";

  async create(data: { name: string; outletId: number }) {
    return await this.post("", data);
  }

  async getList() {
    return await this.get();
  }

  async remove(id: string) {
    return await this.delete(id);
  }

  async update(id: string, data: { name: string; outletId: number }) {
    return await this.put(id, data);
  }
}
