import { connect } from "react-redux";
import { updateVotes } from "../reducers/anecdoteReducer";
import { newNotification } from "../reducers/notificationReducer";

let timeoutID;

const Anecdote = ({ anecdote, vote }) => (
  <div key={anecdote.id}>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
    </div>
  </div>
);

const AnecdoteList = ({ anecdotes, updateVotes, newNotification }) => {
  const voteAction = async (id, content) => {
    const findAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    const updatedAnecdote = { ...findAnecdote, votes: findAnecdote.votes + 1 };
    updateVotes(id, updatedAnecdote);

    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = newNotification(`you voted, ${content}`, 3000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={() => voteAction(anecdote.id, anecdote.content)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const filters = state.filters.toLowerCase();
  const anecdotes = state.anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filters)
  );
  return {
    filters,
    anecdotes,
  };
};

const mapDispatchToProps = {
  updateVotes,
  newNotification,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;
