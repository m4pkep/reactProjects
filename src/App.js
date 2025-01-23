import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  // const [rates, setRates] = React.useState({});
  const ratesRef = React.useRef({});

  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromCurrency, setFromCurrency] = React.useState('AED');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  React.useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
    .then(res => res.json())
    .then((json) => {
      ratesRef.current = json.rates;
      onChangeToPrice(1);
    })
    .catch((err) => {
      console.warn(err);
      alert('не удалось получить информацию');
    });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result);
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result);
    setToPrice(value);
  }

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />  
    </div>
  );
}

export default App;
