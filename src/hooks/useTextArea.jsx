import React, { useState, useCallback } from "react";

const useTextArea = initValue => {
  const [input, setInput] = useState(initValue);

  const onChangeInput = useCallback(e => {
    setInput(e.target.value);
  }, []);

  // ref => textarea, height => 최소 높이
  const resize = useCallback((ref, height = 1) => {
    if (ref.scrollHeight > height) {
      ref.style.height = "1px";
      ref.style.height = 12 + ref.scrollHeight + "px";
    }
  }, []);

  return [input, onChangeInput, setInput, resize];
};

export default useTextArea;
