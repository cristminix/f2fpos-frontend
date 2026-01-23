import { BaseApiService } from "./ApiService";

export class MasterIngredientService extends BaseApiService {
  path = "IngredientService";

  async create(data: {
    outletId: number;
    name: string;
    code: string;
    qty: number;
    minQty: number;
    unit: string;
    alternateUnit?: string;
  }) {
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

  async update(
    id: string,
    data: {
      outletId: number;
      name: string;
      code: string;
      qty: number;
      minQty: number;
      unit: string;
      alternateUnit?: string;
    },
  ) {
    return await this.put(id, data);
  }
}
