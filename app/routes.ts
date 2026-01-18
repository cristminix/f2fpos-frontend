import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("/users", "routes/users.tsx"),
  route("/material-grid", "pages/MaterialUIGridPage.tsx"),
  route("/grid-table-form", "pages/GridTableFormPage.tsx"),
  route("/login", "pages/LoginPage.tsx"),
] satisfies RouteConfig
