import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("/users", "routes/users.tsx"),
  route("/material-grid", "pages/MaterialUIGridPage.tsx"),
  route("/grid-table-form", "pages/GridTableFormPage.tsx"),
  route("/login", "pages/LoginPage.tsx"),
  route("/logout", "pages/LogoutPage.tsx"),
  route("/unauthorized", "pages/UnauthorizedPage.tsx"),
  route("/dashboard", "routes/dashboard.tsx"),
  route("/sales", "routes/sales.tsx"),
  route("/sales/history", "routes/sales-history.tsx"),
] satisfies RouteConfig
