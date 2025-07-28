"use client";

import React, { forwardRef } from "react";
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
  const handleClick = (event) => {
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
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
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
