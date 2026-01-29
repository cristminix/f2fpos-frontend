import { BaseApiService } from "./ApiService"

export interface FileValidationConfig {
  maxSize?: number // Ukuran maksimum dalam bytes (default: 1MB)
  allowedTypes?: string[] // Jenis file yang diizinkan
}

export interface FileUploadResult {
  success: boolean
  data?: string // Base64 string dari file
  error?: string
}

export class FileUploadService extends BaseApiService {
  private defaultConfig: FileValidationConfig
  path = "FileUploadService"

  constructor() {
    super() // Memanggil constructor dari BaseApiService
    this.defaultConfig = {
      maxSize: 1 * 1024 * 1024, // 5MB
      allowedTypes: [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ],
    }
  }

  /**
   * Validates the file against provided configuration
   */
  public validateFile(
    file: File,
    config: FileValidationConfig = {},
  ): FileUploadResult {
    const mergedConfig = { ...this.defaultConfig, ...config }

    // Validasi ukuran file
    if (mergedConfig.maxSize && file.size > mergedConfig.maxSize) {
      return {
        success: false,
        error: `Ukuran file terlalu besar. Maksimum ukuran file adalah ${Math.floor(mergedConfig.maxSize / (1024 * 1024))}MB.`,
      }
    }

    // Validasi tipe file
    if (
      mergedConfig.allowedTypes &&
      !mergedConfig.allowedTypes.includes(file.type)
    ) {
      return {
        success: false,
        error: `Format file tidak didukung. Silakan pilih file dengan format: ${mergedConfig.allowedTypes.join(", ")}.`,
      }
    }

    return { success: true }
  }

  /**
   * Converts a file to base64 string
   */
  public async convertToBase64(file: File): Promise<FileUploadResult> {
    return new Promise((resolve) => {
      const reader = new FileReader()

      reader.onload = () => {
        const base64String = reader.result as string
        resolve({ success: true, data: base64String })
      }

      reader.onerror = () => {
        resolve({
          success: false,
          error: "Gagal membaca file. Silakan coba lagi.",
        })
      }

      reader.readAsDataURL(file)
    })
  }
  //
  /**
   * Get file by ID
   */
  public async getFile(fileId: string): Promise<FileUploadResult> {
    return await this.get(fileId)
  }

  /**
   * Uploads a file and returns its base64 representation after validation
   */
  public async upload(
    file: File,
    config: FileValidationConfig = {},
  ): Promise<FileUploadResult> {
    // Validasi file pertama kali
    const validation = this.validateFile(file, config)
    if (!validation.success) {
      return validation
    }

    // Konversi ke base64
    const base64Result = await this.convertToBase64(file)

    if (!base64Result.success) {
      return base64Result
    }

    // Ambil ekstensi file dari nama file untuk ditentukan sebagai nama file
    const fileName = file.name
    // Pisahkan base64 dari prefix data URL (misalnya: "data:image/png;base64,...")
    const base64Content = base64Result.data //?.split(",")[1] // Ambil bagian setelah koma

    // Kirim file dalam bentuk JSON
    const payload = {
      filename: fileName,
      content: base64Content,
    }

    // Lakukan POST request
    return await this.post("upload", payload)
  }
}

export default new FileUploadService()
