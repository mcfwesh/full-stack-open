const StatisticLine = ({ text, rating }) => {
  return (
    <tr>
      <td> {text}</td>
      <td> {rating}</td>
    </tr>
  );
};

export default StatisticLine;
