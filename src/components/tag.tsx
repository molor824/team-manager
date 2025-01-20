import React from "react";

interface TagProps {
  tagName: string;
  selectTag: (tagName: string) => void;
  selected: boolean;
}

const Tag: React.FC<TagProps> = ({ tagName, selectTag, selected }) => {
  const tagStyle: { [key: string]: string } = {
    HTML: "bg-orange-400 text-white",
    CSS: "bg-teal-400 text-white",
    JavaScript: "bg-yellow-400 text-black",
    React: "bg-sky-400 text-white",
    default: "bg-gray-100 text-gray-700",
  };

  const appliedStyle = selected ? tagStyle[tagName] || tagStyle.default : tagStyle.default;

  return (
    <button
      type="button"
      className={`tag rounded-md border px-3 py-1 mr-2 cursor-pointer transition-all duration-200 ${appliedStyle}`}
      onClick={() => selectTag(tagName)}
    >
      {tagName}
    </button>
  );
};

export default Tag;
