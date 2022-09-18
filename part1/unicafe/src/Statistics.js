import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / 3;
  const percentage = (good / (good + neutral + bad)) * 100;

  return (
    <div>
      <h1>Statistics</h1>

      {good || neutral || bad ? (
        <table>
          <tbody>
            <StatisticLine text="Good" rating={good} />
            <StatisticLine text="Neutral" rating={neutral} />
            <StatisticLine text="Bad" rating={bad} />
            <StatisticLine text="All" rating={all} />
            <StatisticLine text="Average" rating={average} />
            <StatisticLine text="Percentage" rating={percentage} />
          </tbody>
        </table>
      ) : (
        <p> No feedback given</p>
      )}
    </div>
  );
};

export default Statistics;
