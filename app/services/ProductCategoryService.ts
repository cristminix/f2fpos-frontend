import { BaseApiService } from "./ApiService";

export class ProductCategoryService extends BaseApiService {
  path = "ProductCategoryService";

  async create(data: { name: string; outletId: number }) {
    return await this.post("", data);
  }

  async getList(
    page: number = 1,
    limit: number = 10,
    sortField: string,
    sortOrder: string,
  ) {
    const outletId = this.getCurrentOutletId();

    return await this.get("", { page, limit, sortField, sortOrder, outletId });
  }

  async remove(id: string) {
    return await this.delete(id);
  }

  async update(id: string, data: { name: string; outletId: number }) {
    return await this.put(id, data);
  }
}
