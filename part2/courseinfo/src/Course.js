import Content from "./Content";
import Header from "./Header";

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  );
};

export default Course;
