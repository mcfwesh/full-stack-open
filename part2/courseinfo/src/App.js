import Content from "./Content";
import Course from "./Course";
import Header from "./Header";
import Total from "./Total";

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Course course={course} parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
