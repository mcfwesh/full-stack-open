import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part key={index} part={part.name} exercise={part.exercise} />
      ))}
    </>
  );
};

export default Content;
