import { useState } from 'react';

const useModal = (props) => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
    props
  }
};

export default useModal;
