const Total = ({ course }) => {
  return (
    <>
      <p>
        Number of exercises {course.parts.reduce((a, b) => a + b.exercises, 0)}
      </p>
    </>
  );
};

export default Total;
