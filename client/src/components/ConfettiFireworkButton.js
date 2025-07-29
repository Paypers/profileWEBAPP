"use client";

import React, { forwardRef, useState, useRef } from "react";
import confetti from "canvas-confetti";
import PropTypes from "prop-types";

// Placeholder for a UI library button. Forwards all props to a standard button element.
const Button = forwardRef(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
));

/**
 * A button that triggers a confetti firework effect on click.
 * @param {object} props - The component props.
 * @param {React.ReactNode} [props.children="Trigger Fireworks"] - The button content.
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onClick] - An optional click handler to run alongside the confetti effect.
 */
export function ConfettiFireworksButton({ children, onClick, ...props }) {
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0);
  const clickTimestamps = useRef([]);
  const countdownInterval = useRef(null);

  const handleClick = (event) => {
    // Prevent any action if the button is on cooldown.
    if (isCoolingDown) {
      return;
    }

    // Call the original onClick handler if it exists
    if (onClick) {
      onClick(event);
    }

    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    /**
     * Generates a random number within a given range.
     * @param {number} min The minimum value.
     * @param {number} max The maximum value.
     * @returns {number} A random number between min and max.
     */
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 70 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // --- Cooldown Logic ---
    const now = Date.now();
    const quickClickWindow = 2000; // Clicks within 2 seconds are "in a row"

    // Filter out old timestamps
    clickTimestamps.current = clickTimestamps.current.filter(
      (timestamp) => now - timestamp < quickClickWindow
    );
    clickTimestamps.current.push(now);

    // If 5 clicks happen within the window, start a 5-second cooldown
    if (clickTimestamps.current.length >= 5) {
      setIsCoolingDown(true);
      setCooldownTimeLeft(5);
      clickTimestamps.current = []; // Reset clicks

      countdownInterval.current = setInterval(() => {
        setCooldownTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdownInterval.current);
            setIsCoolingDown(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  // Cleanup the timer if the component unmounts
  React.useEffect(() => {
    return () => clearInterval(countdownInterval.current);
  }, []);

  return (
    <Button onClick={handleClick} disabled={isCoolingDown} {...props}>
      {isCoolingDown ? cooldownTimeLeft : children}
    </Button>
  );
}

ConfettiFireworksButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

ConfettiFireworksButton.defaultProps = {
  children: "Trigger Fireworks",
};
