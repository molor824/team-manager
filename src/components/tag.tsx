import React from "react";

type TagProps = {
  tagName: "JavaScript" | "React";
  selectTag: (tag: string) => void;
  selected: boolean;
};

const Tag: React.FC<TagProps> = ({ tagName, selectTag, selected }) => {
  const tagStyle = {
    HTML: "bg-yellow-400",
    CSS: "bg-teal-400",
    JavaScript: "bg-yellow-300",
    React: "bg-blue-300",
    default: "bg-gray-100",
  };

  return (
    <button
      type="button"
      className={`text-sm font-medium border border-gray-300 rounded-md px-3 py-1 mr-2 cursor-pointer transition-colors ${
        selected ? tagStyle[tagName] : tagStyle.default
      }`}
      onClick={() => selectTag(tagName)}
    >
      {tagName}
    </button>
  );
};

export default Tag;
