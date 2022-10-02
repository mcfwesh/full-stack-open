import { connect } from "react-redux";
import { createAnecdotes } from "../reducers/anecdoteReducer";
import { newNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ createAnecdotes, newNotification }) => {
  const add = async (e) => {
    e.preventDefault();
    const anecdoteContent = e.target.anecdote.value;
    createAnecdotes(anecdoteContent);
    newNotification(`you created the content, ${anecdoteContent}`, 3000);
    e.target.anecdote.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};
const mapDispatchToProps = {
  createAnecdotes,
  newNotification,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
