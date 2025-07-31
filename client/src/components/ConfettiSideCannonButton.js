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
 * A button that triggers a confetti cannon effect from the sides of the screen.
 * @param {object} props - The component props.
 * @param {string[]} [props.colors] - An array of hex color codes for the confetti.
 * @param {React.ReactNode} [props.children="Trigger Side Cannons"] - The button content.
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onClick] - An optional click handler to run alongside the confetti effect.
 */
export function ConfettiSideCannonsButton({ children, onClick, colors, ...props }) {
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

    // Fire the confetti effect.
    const triggerConfetti = () => {
      // --- Dynamic Effect Scaling ---
      // This makes the effect feel more balanced on different screen sizes.
      const referenceWidth = 1440; // A reference desktop width for scaling

      // Scale duration
      const baseDuration = 1000; // 1 second
      const minDuration = 200; // .2 second
      const scaledDuration = baseDuration * (window.innerWidth / referenceWidth);
      const dynamicDuration = Math.max(minDuration, Math.min(baseDuration, scaledDuration));
      const end = Date.now() + dynamicDuration;

      // Scale velocity
      const baseVelocity = 80;
      const minVelocity = 40;
      const scaledVelocity = baseVelocity * (window.innerWidth / referenceWidth);
      const dynamicVelocity = Math.max(minVelocity, Math.min(baseVelocity, scaledVelocity));

      const frame = () => {
        if (Date.now() > end) return;

        // Left cannon
        confetti({ particleCount: 6, angle: 60, spread: 70, startVelocity: dynamicVelocity, origin: { x: 0, y: 0.5 }, colors });
        // Right cannon
        confetti({ particleCount: 6, angle: 120, spread: 70, startVelocity: dynamicVelocity, origin: { x: 1, y: 0.5 }, colors });

        requestAnimationFrame(frame);
      };

      frame();
    };

    triggerConfetti();

    // --- Cooldown Logic ---
    const now = Date.now();
    const quickClickWindow = 2000; // Clicks within 2 seconds are "in a row"

    // Filter out old timestamps
    clickTimestamps.current = clickTimestamps.current.filter(
      timestamp => now - timestamp < quickClickWindow
    );
    clickTimestamps.current.push(now);

    // If 5 clicks happen within the window, start a 5-second cooldown
    if (clickTimestamps.current.length >= 3) {
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

ConfettiSideCannonsButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  colors: PropTypes.arrayOf(PropTypes.string),
};

ConfettiSideCannonsButton.defaultProps = {
  children: "Trigger Side Cannons",
  // Added more colors to the default palette, including the site's accent color
  colors: ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1", "#61dafb", "#76e8b3"],
};
