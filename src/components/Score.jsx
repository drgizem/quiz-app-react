import questions from "../questions";

function Score(props) {
  return (
    <div className="result">
      "Your score is {props.point}/{questions.length}
    </div>
  );
}
export default Score;
