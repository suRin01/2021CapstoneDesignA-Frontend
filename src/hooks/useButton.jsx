import React, { useState, useCallback } from "react";

const useButton = initValue => {
  const [button, setButton] = useState(initValue);

  const onChangeButton = useCallback(e => {
    setButton(prev => !prev);
  }, []);

  return [button, onChangeButton];
};

export default useButton;
