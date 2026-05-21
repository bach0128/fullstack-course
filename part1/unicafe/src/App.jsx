import { useEffect, useState } from "react";

const Statistics = (props) => {
  // ...
  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  useEffect(() => {
    setTotal(good + neutral + bad);
    setAverage(total > 0 ? (good - bad) / total : 0);
    setPositive(total > 0 ? (good / total) * 100 : 0);
  }, [good, neutral, bad, total]);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <div>
        <h1>statistics</h1>
        {total === 0 ? (
          <p>No feedback given</p>
        ) : (
          <>
            <Statistics good={good} neutral={neutral} bad={bad} />
            <StatisticLine text="total" value={total} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={`${positive}%`} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
