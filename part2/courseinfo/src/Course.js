import Content from "./Content";
import Header from "./Header";

const Course = ({ parts, course }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
    </>
  );
};

export default Course;
