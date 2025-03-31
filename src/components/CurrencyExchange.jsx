import { useEffect, useState } from "react"
import CurrencyDropdown from './dropdown'
import { HiArrowsRightLeft } from "react-icons/hi2"

const CurrencyConverter = () => {
    // Prob
    const [currencies, setCurrencies] = useState({})
    const [amount, setAmount] = useState(1)
    const [fromCurrency, setFromCurrency] = useState("USD")
    const [toCurrency, setToCurrency] = useState("TWD")    
    const [convertedAmount, setConvertedAmount] = useState(null)
    const apiKey = import.meta.env.VITE_EXCHANGERATE_API_KEY

    const fetchCurrencies = async () => {
        try {
            const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`);
            const data = await res.json();
            
            setCurrencies(data);
        } catch (error) {
            console.error("Error fetching: ", error);
        }
    }

    useEffect(() => {
        fetchCurrencies();
    },[fromCurrency]);

    useEffect(() => {
        if (currencies.conversion_rates && currencies.conversion_rates[toCurrency]) {
            setConvertedAmount((amount * currencies.conversion_rates[toCurrency]).toFixed(2));
        }
    }, [currencies, toCurrency, amount]); 

    const swapCurrencies = () => {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }

  return (
    <div className="max-w-xl mx-auto p-5 bg-whtie rounded-lg">
        <h2 className="mb-5 text-2xl font-semibold text-gray-700">
            Currency Converter
        </h2>
        <div>
            <label 
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
            >
                Amount
            </label>
            <input 
                type="Number" 
                className="w-full p-2 border border-gray-300 rounded-md shadow-md focust:outline-none focus-ring-2 focus:ring-indigo-500 mt-1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            >
            </input>
        </div> 
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 items-end">
            <CurrencyDropdown 
                currencies={currencies} 
                title="From "
                currency={fromCurrency}
                setCurrency={setFromCurrency}
            >    
            </CurrencyDropdown>

            <div className="flex justify-center mb-0 sm:mt-1">
                <button 
                    onClick={swapCurrencies}
                    className="p-2 bg-gray-200 rounded-3xl cursor-pointer hover:bg-gray-300">
                    <HiArrowsRightLeft className="text-xl text-gray-600"></HiArrowsRightLeft>           
                </button>
            </div>
            <CurrencyDropdown 
                currencies={currencies} 
                title="To "
                currency={toCurrency}
                setCurrency={setToCurrency}
            > 
            </CurrencyDropdown>
        </div>
   
        <div className="mt-4 text-lg font-medium text-right text-green-800">
            Rate: {currencies.conversion_rates?.[toCurrency]}
        </div>
        <div className="mt-4 text-lg font-medium text-right text-green-800">
            {/* Exchange Rate: {currencies.conversion_rates[toCurrency]} */}

            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </div>

    </div>
  )
}

export default CurrencyConverter

   