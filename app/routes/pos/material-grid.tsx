import MaterialUIGridPage from "../../pages/pos/MaterialUIGridPage"

export function meta() {
  return [
    { title: "Material UI Grid - F2FPOS" },
    {
      name: "description",
      content: "Contoh implementasi Material UI Responsive Grid",
    },
  ]
}

export default function MaterialGridRoute() {
  return <MaterialUIGridPage />
}
