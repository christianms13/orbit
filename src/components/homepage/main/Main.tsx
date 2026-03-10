import ConnectionGraph from "./ConnectionGraph"
import Form from "./Form"
import OptimalPathResults from "./OptimalPathResults"

export default function Main() {
  return (
    <main className = "flex flex-col gap-10">
      <Form />
      <ConnectionGraph />
      <OptimalPathResults />
    </main>
  )
}
