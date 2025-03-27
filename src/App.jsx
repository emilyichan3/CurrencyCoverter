import "./App.css"
import CurrencyConverter from './components/CurrencyExchange'

function App() {
    return (
        <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center">
            <div className="container">
            <CurrencyConverter></CurrencyConverter>
            </div>
        </div>
    );
}

export default App;