const Button = ({ text, rating, setRating }) => {
  return (
    <div>
      <button
        style={{ display: "inline" }}
        onClick={() => setRating(rating + 1)}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
