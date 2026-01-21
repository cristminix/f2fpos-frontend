export class BaseApiService {
  apiBaseUrl = "http://localhost:8787/api"
  path = "health"
  constructor() {
    const host = document.location.host
    console.log(document.location.host)
    if (host.includes("f2fpos.pages.dev")) {
      this.apiBaseUrl = "https://f2fpos-backend.cristminix.workers.dev/api"
    } else if (host.includes("jonisteak.com")) {
      this.apiBaseUrl = "https://f2fposv1.jonisteak.com/api"
    }
  }
  setApiBaseUrl(url: string) {
    this.apiBaseUrl = url
  }
  getAccessToken() {
    return localStorage.getItem("accessToken")
  }
  getRefreshToken() {
    return localStorage.getItem("refreshToken")
  }
  async updateAcessToken() {
    const endPoint = `${this.apiBaseUrl}/LoginService/refresh`
    try {
      const response = await fetch(endPoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer token ${this.getRefreshToken()}`,
          "Content-Type": "application/json",
        },
      })
      const { accessToken, refreshToken } = await response.json()
      console.log({ accessToken, refreshToken })
    } catch (error) {}
  }
  async fetch(url: string, options: any) {
    try {
      const response = await this.fetch(url, options)
    } catch (error) {}
  }
  async get(servicePath: string, payload: any) {
    const endPoint = `${this.apiBaseUrl}/${this.path}/${servicePath}`
    return await this.fetch(endPoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer token ${this.getAccessToken()}`,
        "Content-Type": "application/json",
      },
    })
  }
  async post(servicePath: string, payload: any) {
    const endPoint = `${this.apiBaseUrl}/${this.path}/${servicePath}`
    return await this.fetch(endPoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer token ${this.getAccessToken()}`,
        "Content-Type": "application/json",
        body: JSON.stringify(payload),
      },
    })
  }
  async put(servicePath: string, payload: any) {
    const endPoint = `${this.apiBaseUrl}/${this.path}/${servicePath}`
    return await this.fetch(endPoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer token ${this.getAccessToken()}`,
        "Content-Type": "application/json",
      },
    })
  }
  async delete(servicePath: string, payload: any) {
    const endPoint = `${this.apiBaseUrl}/${this.path}/${servicePath}`
    return await this.fetch(endPoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer token ${this.getAccessToken()}`,
        "Content-Type": "application/json",
      },
    })
  }
}
