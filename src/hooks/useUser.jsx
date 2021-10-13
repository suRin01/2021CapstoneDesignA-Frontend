import React, { useState } from "react";

const useUser = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return [user, setUser];
};

export default useUser;
