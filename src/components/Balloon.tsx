import React, { useEffect, useState } from 'react';

type BalloonProps = {
  onPop: () => void;
  id: number;
  onPopWithDelay: (id: number) => void;
};

const Balloon: React.FC<BalloonProps> = ({ onPop, id, onPopWithDelay }) => {
  const [left, setLeft] = useState(Math.random() * 100);
  const [isShaking, setIsShaking] = useState(false); // Control shake animation
  const [isPopped, setIsPopped] = useState(false);  // Control balloon disappearance after pop

  useEffect(() => {
    const timeout = setTimeout(onPop, 5000);
    return () => clearTimeout(timeout);
  }, [onPop]);

  const handleClick = () => {
    // Start shaking and balloon disappearing effect
    setIsShaking(true);
    setIsPopped(true);

    // Delay the pop action and balloon disappearance
    setTimeout(() => {
      onPopWithDelay(id); // Trigger the delayed pop with animation
      setIsShaking(false); // Reset shaking after animation is complete
    }, 500); // Shake for 500ms before removing the balloon
  };

  return (
    <div
      className={`absolute bottom-0 text-8xl cursor-pointer animate-float ${
        isShaking ? 'animate-shake' : ''
      } ${isPopped ? 'animate-move-down' : ''}`}  // Apply shake and move-down animations
      style={{ left: `${left}%` }}
      onClick={handleClick}
    >
      🎈
    </div>
  );
};

export default Balloon;
