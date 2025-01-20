import React, { useState } from "react";

interface DropAreaProps {
  onDrop: () => void;
}

const DropArea: React.FC<DropAreaProps> = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={`transition-opacity duration-200 ease-in-out ${
        showDrop ? "opacity-100 border-dashed border-gray-400" : "opacity-0"
      } w-full h-24 border rounded-lg p-4 mb-4 flex items-center justify-center`}
    >
      {showDrop && <p className="text-gray-500">Drop Here</p>}
    </div>
  );
};

export default DropArea;
