import React, { useState, useCallback } from "react";

const useButton = initValue => {
  const [button, setButton] = useState(initValue);

  const onChangeButton = useCallback(() => {
    setButton(prev => !prev);
  }, []);

  return [button, onChangeButton, setButton];
};

export default useButton;
