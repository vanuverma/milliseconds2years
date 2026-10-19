import { useState } from 'react';
import './App.css';

interface Unit {
  name: string;
  label: string;
  factor: number;
  id: string;
}

const units: Unit[] = [
  { name: 'milliseconds', label: 'Enter Milliseconds', factor: 1, id: 'input-milliseconds' },
  { name: 'seconds', label: 'Enter Seconds', factor: 1000, id: 'input-seconds' },
  { name: 'minutes', label: 'Enter Minutes', factor: 60 * 1000, id: 'input-minutes' },
  { name: 'hours', label: 'Enter Hours', factor: 60 * 60 * 1000, id: 'input-hours' },
  { name: 'days', label: 'Enter Days', factor: 24 * 60 * 60 * 1000, id: 'input-days' },
  { name: 'weeks', label: 'Enter Weeks', factor: 7 * 24 * 60 * 60 * 1000, id: 'input-weeks' },
  { name: 'months', label: 'Enter Months', factor: 30 * 24 * 60 * 60 * 1000, id: 'input-months' },
  { name: 'years', label: 'Enter Years', factor: 365 * 24 * 60 * 60 * 1000, id: 'input-years' },
];

function App() {
  const [totalMs, setTotalMs] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, factor: number) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setTotalMs(0);
      return;
    }
    let value = parseFloat(inputValue);
    if (value < 0) {
      value = 0;
    }
    setTotalMs(value * factor);
  };

  return (
    <>
      <section id="header-section">
        <div>
          <h1>Milliseconds to Years</h1>
        </div>
      </section>

      <section id="input-form-section">
        <div id="input-form-div">
          <p>Edit the value of any of the input box below and see the results reflect on the other boxes automatically</p>

          <div className="inputs-container">
            {units.map((unit) => (
              <div key={unit.id} className="input-group">
                <label htmlFor={unit.id}>{unit.name}</label>
                <input
                  id={unit.id}
                  type="number"
                  placeholder={unit.label}
                  value={totalMs / unit.factor}
                  onChange={(e) => handleInputChange(e, unit.factor)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="spacer"></section>
    </>
  );
}

export default App
