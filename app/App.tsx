import { Link, Outlet } from "react-router"

const App = () => {
  return (
    <>
      <h1>React Router</h1>

      {/* Routes sekarang ditangani oleh sistem React Router */}
      <div>
        <Navigation />
        <main style={{ padding: "1rem 0" }}>
          <h2>Welcome to the App</h2>
          <p>Navigate using the links above.</p>
        </main>
      </div>
      <Outlet />
    </>
  )
}

const Navigation = () => {
  return (
    <nav
      style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
    </nav>
  )
}

export default App
