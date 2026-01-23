import { BaseApiService } from "./ApiService";

export class MasterIngredientService extends BaseApiService {
  path = "MasterIngredient";

  async create(data: {
    nama: string;
    kode: string;
    stokSaatIni: number;
    stokMinimum: number;
    satuanDasar: string;
    satuanLain?: string
  }) {
    return await this.post("", data);
  }

  async getList(
    page: number = 1,
    limit: number = 10,
    sortField: string,
    sortOrder: string,
  ) {
    return await this.get("", { page, limit, sortField, sortOrder });
  }

  async remove(id: string) {
    return await this.delete(id);
  }

  async update(id: string, data: {
    nama: string;
    kode: string;
    stokSaatIni: number;
    stokMinimum: number;
    satuanDasar: string;
    satuanLain?: string
  }) {
    return await this.put(id, data);
  }
}
