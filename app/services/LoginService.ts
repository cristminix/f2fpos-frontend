import { BaseApiService } from "./ApiService"

export class LoginService extends BaseApiService {
  path = "LoginService"

  async login(email: string, password: string) {
    const endPoint = `${this.apiBaseUrl}/LoginService/login`
    try {
      const response = await fetch(endPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const {
        success,
        message,
        accessToken,
        refreshToken,
        user,
        roles,
        outlets,
      } = await response.json()
      console.log({ accessToken, refreshToken })
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      return { success, message, user, roles, outlets }
    } catch (error) {}
    return { success: false, message: "" }
  }
  logout() {}
  getCurrentUser() {
    let user: any = localStorage.getItem("user") || ""
    try {
      user = JSON.parse(user)
    } catch (error) {
      user = null
    }
    return user
  }

  async setCurrentUser(user: any) {}
  async updateCurrentUserInfo() {}

  async getCurrentUserInfo() {}
  async updateCurrentUserPassword() {}
}
