import { useState } from "react";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <br />
      <Button text="Good" rating={good} setRating={setGood} />
      <Button text="Neutral" rating={neutral} setRating={setNeutral} />
      <Button text="Bad" rating={bad} setRating={setBad} />
      <br />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
