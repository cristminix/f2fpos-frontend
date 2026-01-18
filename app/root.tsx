import { Layout } from "./components/layouts/Layout"
import "./app.css"
import App from "./App"
import { ErrorBoundary } from "./components/common/ErrorBoundary"
import { links } from "./components/common/links"
import { ThemeProvider } from "./components/common/ThemeProvider"

export { Layout, ErrorBoundary, links }

export default function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}
