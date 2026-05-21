import Content from "./Content";
import Header from "./Header";

const Course = ({ course }) => {
  const total = course.parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <strong>Total exercises: {total}</strong>
    </div>
  );
};

export default Course;
