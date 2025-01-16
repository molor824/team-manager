import { Button } from "antd";
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Button type="primary" onClick={() => setCount(count + 1)}>
        Count is {count}
      </Button>
    </div>
  );
};
export default App;
