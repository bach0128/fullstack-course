import React from "react";

function Content(props) {
  return (
    <div>
      <ul>
        {props.parts.map((part) => (
          <li key={part.name}>
            {part.name}: part-{part.exercises}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Content;
