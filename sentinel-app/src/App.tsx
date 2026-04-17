import MarketMonitor from './components/MarketMonitor'
import './App.css'

function App() {

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b bg-white p-4">
        <div className="max-w-6xl mx-auto font-bold text-xl tracking-tighter">
          PROJECT <span className="text-blue-600">SENTINEL</span>
        </div>
      </nav>
      <main>
        <MarketMonitor />
      </main>
    </div>
  )
}

export default App
