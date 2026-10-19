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

      <section id="info-section">
        <div className="info-container">
          <h2>Understanding the Time Conversion Logic</h2>
          <p>
            Our ultimate time converter uses a highly precise calculation engine based on a single source of truth: <strong>milliseconds</strong>. 
            When you enter a value in any field, the system first converts that value into total milliseconds and then immediately redistributes 
            that total across all other time units. This ensures perfect synchronization and prevents calculation errors.
          </p>
          <div className="calculation-details">
            <h3>Conversion Standards Used:</h3>
            <ul>
              <li>1 Second = 1,000 Milliseconds</li>
              <li>1 Minute = 60 Seconds</li>
              <li>1 Hour = 60 Minutes</li>
              <li>1 Day = 24 Hours</li>
              <li>1 Week = 7 Days</li>
              <li>1 Month = 30 Days (Standardized)</li>
              <li>1 Year = 365 Days (Standardized)</li>
            </ul>
          </div>

          <div className="seo-content">
            <h2>The Most Accurate Online Time Conversion Tool</h2>
            <p>
              Looking for a quick way to <strong>convert milliseconds to seconds</strong>, <strong>minutes to hours</strong>, or <strong>days to years</strong>? 
              Our free web-based <strong>time converter</strong> is designed for speed and accuracy. Whether you need to calculate 
              <strong>time durations</strong> or convert between different <strong>time units</strong>, our tool handles it all instantly. 
              It is the perfect tool for developers, scientists, and anyone needing a reliable <strong>unit converter</strong> for time-based data.
            </p>
            <p>
              This tool supports various conversions including: &nbsp;
              <em>milliseconds to seconds, seconds to minutes, minutes to hours, hours to days, days to weeks, weeks to months, months to years and vice-versa.</em>
            </p>
          </div>
        </div>
      </section>

      <section id="spacer"></section>
    </>
  );
}

export default App;
