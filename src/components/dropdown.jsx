import PropTypes from 'prop-types';

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  title="",
}) => {
  return (
    <div>
      <label htmlFor={title}>{title}</label>

      <div className="mt-1 relative">
      <select 
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'>
        {Object.keys(currencies?.conversion_rates || {}).map((currencyCode) => (
          <option value={currencyCode} key={currencyCode}>
            {currencyCode}
          </option>
        ))}
      </select>
      </div>
    </div>
  )
}

CurrencyDropdown.propTypes  = {
  currencies: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  setCurrency: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}


export default CurrencyDropdown
