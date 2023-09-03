import FetchPassword from "./components/FetchPassword"
import Index from "./components/Index"

function App() {
	return (
		<>
			<div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "lightgray" }}>
				<h1 className="text-center p-2 pt-1 my-5 bg-info rounded mx-auto w-auto">Password Generator</h1>
				<div className="mb-auto mt-4 w-auto">
					<Index />
					<FetchPassword />
				</div>
			</div>
		</>
	)
}

export default App
