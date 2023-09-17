import { useState } from "react";

function TextExpander({
  collapsedNumWords = 10,
  collapsedNumChars = 30,
  withChar = true,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "#1f09cd",
  expanded = false,
  className,
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  let displayText;
  let Num;
  if (!withChar) {
    Num = children.split(" ").length;
    displayText =
      isExpanded || Num < collapsedNumWords
        ? children
        : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";
  } else {
    Num = children.length;
    displayText =
      isExpanded || Num < collapsedNumChars
        ? children
        : children.split("").slice(0, collapsedNumChars).join("") + "...";
  }
  const buttonStyle = {
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer",
    // marginLeft: "6px",
    color: buttonColor,
  };

  return (
    <div className={className}>
      <p>{displayText}</p>
      {(Num > collapsedNumWords && !withChar) ||
      (Num > collapsedNumChars && withChar) ? (
        <p onClick={() => setIsExpanded((exp) => !exp)} style={buttonStyle}>
          {isExpanded ? collapseButtonText : expandButtonText}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default TextExpander;
