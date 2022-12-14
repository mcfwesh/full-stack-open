import { useState } from "react";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(7).fill(0));

  const index = getRandomInt(0, 6);
  const handleSelected = () => {
    setSelected(index);
  };

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] = copy[selected] + 1;
    setVotes(copy);
  };

  const getMaxVote = () => {
    const max = Math.max(...votes);
    return votes.indexOf(max);
  };

  console.log(getMaxVote());

  return (
    <div>
      <h1>Anecdotes of the Day</h1>
      {anecdotes[selected]}
      <br />
      <p>has {votes[selected]}</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleSelected}>Next Anecdote</button>
      <br />
      <h1>Anecdotes with most votes</h1>
      <p>{anecdotes[getMaxVote()]}</p>
      <p>has {votes[selected]}</p>
    </div>
  );
};

export default App;
