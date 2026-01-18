import { Outlet } from "react-router"
import Navigation from "./components/ui/Navigation"

const App = () => {
  return (
    <>
      <div style={{ padding: "1rem" }}>
        <h1>React Router</h1>

        {/* Routes sekarang ditangani oleh sistem React Router */}
        <div>
          <Navigation />
          <main style={{ padding: "1rem 0" }}>
            <h2>Welcome to the App</h2>
            <p>Navigate using the menu button above.</p>
          </main>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default App
