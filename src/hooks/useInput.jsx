import React, { useState, useCallback } from "react";

const useInput = initValue => {
  const [input, setInput] = useState(initValue);

  const onChangeInput = useCallback(e => {
    setInput(e.target.value);
  }, []);

  return [input, onChangeInput, setInput];
};

export default useInput;
