import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("/admin/users", "routes/admin/users.tsx"),
  // route("/material-grid", "pages/MaterialUIGridPage.tsx"),
  // route("/grid-table-form", "pages/GridTableFormPage.tsx"),
  route("/login", "routes/login.tsx"),
  route("/logout", "pages/LogoutPage.tsx"),
  route("/unauthorized", "pages/UnauthorizedPage.tsx"),
  // route("/dashboard", "routes/dashboard.tsx"),
  // route("/sales", "routes/sales.tsx"),
  // route("/sales/history", "routes/sales-history.tsx"),
  // route("/shift-report", "routes/shift-report.tsx"),
  // route("/master-product", "routes/master-product.tsx"),
  // route("/product-category", "routes/product-category.tsx"),
  // route("/master-ingredient", "routes/master-ingredient.tsx"),
  // route("/suppliers", "routes/suppliers.tsx"),
  // route("/purchase-orders", "routes/purchase-orders.tsx"),
  // route("/stock-adjustment", "routes/stock-adjustment.tsx"),
  // route("/my-outlet", "routes/my-outlet.tsx"),
  // route("/owner-reports", "routes/owner-report.tsx"),
  // route("/staff", "routes/staff.tsx"),
] satisfies RouteConfig
