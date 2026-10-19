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

const faqItems = [
  {
    question: 'How many milliseconds are in a second?',
    answer: 'There are exactly 1,000 milliseconds in one second. To convert seconds to milliseconds, multiply by 1,000. To convert milliseconds to seconds, divide by 1,000.',
  },
  {
    question: 'How many milliseconds are in a minute?',
    answer: 'There are 60,000 milliseconds in one minute (60 seconds × 1,000 milliseconds per second).',
  },
  {
    question: 'How many milliseconds are in an hour?',
    answer: 'There are 3,600,000 milliseconds in one hour (3,600 seconds × 1,000 milliseconds per second).',
  },
  {
    question: 'How many milliseconds are in a day?',
    answer: 'There are 86,400,000 milliseconds in one day (86,400 seconds × 1,000 milliseconds per second).',
  },
  {
    question: 'How many milliseconds are in a year?',
    answer: 'There are 31,536,000,000 milliseconds in one year, based on a standard 365-day year (365 days × 24 hours × 60 minutes × 60 seconds × 1,000 milliseconds).',
  },
  {
    question: 'Why do developers use milliseconds?',
    answer: 'Milliseconds are the standard unit for measuring time in programming. JavaScript\'s Date.now(), Unix timestamps in many APIs, network latency, animation frame timing, database query performance, and sleep/timeout functions all use milliseconds. They offer enough precision for most software tasks without the overhead of nanoseconds.',
  },
  {
    question: 'What is the difference between a millisecond and a microsecond?',
    answer: 'A millisecond (ms) is one-thousandth of a second (1/1,000 s). A microsecond (µs) is one-millionth of a second (1/1,000,000 s). There are 1,000 microseconds in one millisecond.',
  },
  {
    question: 'How do I convert days to milliseconds?',
    answer: 'To convert days to milliseconds, multiply the number of days by 86,400,000 (the number of milliseconds in one day). For example, 3 days = 3 × 86,400,000 = 259,200,000 milliseconds.',
  },
];

const conversionTable = [
  { unit: '1 Second', ms: '1,000 ms' },
  { unit: '1 Minute', ms: '60,000 ms' },
  { unit: '1 Hour', ms: '3,600,000 ms' },
  { unit: '1 Day', ms: '86,400,000 ms' },
  { unit: '1 Week', ms: '604,800,000 ms' },
  { unit: '1 Month (30 days)', ms: '2,592,000,000 ms' },
  { unit: '1 Year (365 days)', ms: '31,536,000,000 ms' },
];

// JSON-LD structured data for rich search results
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Milliseconds to Years — Time Unit Converter',
      description:
        'Free online time converter. Instantly convert between milliseconds, seconds, minutes, hours, days, weeks, months, and years.',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
};

function App() {
  const [totalMs, setTotalMs] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, factor: number) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setTotalMs(0);
      return;
    }
    let value = parseFloat(inputValue);
    if (value < 0) value = 0;
    setTotalMs(value * factor);
  };

  return (
    <>
      {/* JSON-LD Structured Data — helps Google show rich FAQ results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── Hero / Tool ───────────────────────────────────────────────── */}
      <header id="header-section" role="banner">
        <div>
          <h1>Milliseconds to Years — Time Unit Converter</h1>
          <p className="hero-subtitle">
            Instantly convert between milliseconds, seconds, minutes, hours, days, weeks, months,
            and years. Enter any value and all units update in real time.
          </p>
        </div>
      </header>

      <main>
        {/* ── Converter ─────────────────────────────────────────────────── */}
        <section id="input-form-section" aria-label="Time unit converter">
          <div id="input-form-div">
            <p>
              Edit any field — all other units recalculate instantly from a single millisecond
              source of truth.
            </p>
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

        {/* ── Quick-Reference Conversion Table ──────────────────────────── */}
        <section id="conversion-table-section" aria-labelledby="table-heading">
          <div className="info-container">
            <h2 id="table-heading">Millisecond Conversion Reference Table</h2>
            <p>
              Use this table as a quick reference for the most common time-unit conversions to
              milliseconds.
            </p>
            <table aria-label="Millisecond conversion table">
              <thead>
                <tr>
                  <th scope="col">Time Unit</th>
                  <th scope="col">Milliseconds</th>
                </tr>
              </thead>
              <tbody>
                {conversionTable.map((row) => (
                  <tr key={row.unit}>
                    <td>{row.unit}</td>
                    <td>{row.ms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── How It Works ──────────────────────────────────────────────── */}
        <section id="info-section" aria-labelledby="how-it-works-heading">
          <div className="info-container">
            <h2 id="how-it-works-heading">How the Time Converter Works</h2>
            <p>
              Every input is converted to a single base value in milliseconds, then all other
              fields are derived from that base. This single-source-of-truth approach eliminates
              rounding drift that plagues multi-step converters and guarantees that all values stay
              in perfect sync.
            </p>

            <h3>Conversion Standards</h3>
            <ul>
              <li>
                <strong>1 Second</strong> = 1,000 Milliseconds
              </li>
              <li>
                <strong>1 Minute</strong> = 60 Seconds = 60,000 Milliseconds
              </li>
              <li>
                <strong>1 Hour</strong> = 60 Minutes = 3,600,000 Milliseconds
              </li>
              <li>
                <strong>1 Day</strong> = 24 Hours = 86,400,000 Milliseconds
              </li>
              <li>
                <strong>1 Week</strong> = 7 Days = 604,800,000 Milliseconds
              </li>
              <li>
                <strong>1 Month</strong> = 30 Days (standardized) = 2,592,000,000 Milliseconds
              </li>
              <li>
                <strong>1 Year</strong> = 365 Days (standardized) = 31,536,000,000 Milliseconds
              </li>
            </ul>

            <h3>Common Use Cases for Millisecond Conversion</h3>
            <ul>
              <li>
                <strong>Software development:</strong> JavaScript's <code>Date.now()</code>,{' '}
                <code>setTimeout()</code>, and <code>setInterval()</code> all accept milliseconds.
                Converting human-readable durations (e.g., "2 days") into milliseconds is a daily
                task for web developers.
              </li>
              <li>
                <strong>Database &amp; API timestamps:</strong> Unix epoch timestamps are often
                stored and transmitted in milliseconds. Converting them to days or years helps with
                data validation and expiry logic.
              </li>
              <li>
                <strong>Performance profiling:</strong> Benchmarking tools report execution time in
                milliseconds; converting to seconds or minutes helps interpret long-running
                processes.
              </li>
              <li>
                <strong>Science &amp; engineering:</strong> Signal processing, physics simulations,
                and sensor data often use millisecond precision.
              </li>
              <li>
                <strong>Finance &amp; trading:</strong> High-frequency trading systems and
                financial APIs timestamp events in milliseconds to ensure correct ordering.
              </li>
            </ul>
          </div>
        </section>

        {/* ── FAQ Section (targets featured snippets & AI overviews) ────── */}
        <section id="faq-section" aria-labelledby="faq-heading">
          <div className="info-container">
            <h2 id="faq-heading">Frequently Asked Questions About Time Conversion</h2>
            <dl className="faq-list">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className={`faq-item${openFaq === index ? ' faq-open' : ''}`}
                >
                  <dt>
                    <button
                      aria-expanded={openFaq === index}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      {item.question}
                    </button>
                  </dt>
                  <dd id={`faq-answer-${index}`} hidden={openFaq !== index}>
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer id="site-footer" role="contentinfo">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">⏱</span>
            <span className="footer-name">milliseconds2years</span>
            <p className="footer-tagline">
              The fastest way to convert between any two time units — from milliseconds to years.
            </p>
          </div>

          <nav className="footer-links" aria-label="Quick conversions">
            <p className="footer-links-heading">Quick Conversions</p>
            <ul>
              <li>Milliseconds → Seconds</li>
              <li>Seconds → Minutes</li>
              <li>Minutes → Hours</li>
              <li>Hours → Days</li>
              <li>Days → Weeks</li>
              <li>Weeks → Months</li>
              <li>Months → Years</li>
            </ul>
          </nav>

          <div className="footer-facts">
            <p className="footer-links-heading">Did You Know?</p>
            <ul>
              <li>1 day = 86,400,000 ms</li>
              <li>1 year = 31,536,000,000 ms</li>
              <li>Light travels 300 km in 1 ms</li>
              <li>A human blink ≈ 150–400 ms</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Milliseconds to Years · Free online time unit converter · No sign-up required</p>
        </div>
      </footer>
    </>
  );
}

export default App;
