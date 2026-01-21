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
  route("/shift-report", "routes/shift-report.tsx"),
  route("/master-product", "routes/master-product.tsx"),
  route("/product-category", "routes/product-category.tsx"),
  route("/master-ingredient", "routes/master-ingredient.tsx"),
  route("/suppliers", "routes/suppliers.tsx"),
] satisfies RouteConfig
