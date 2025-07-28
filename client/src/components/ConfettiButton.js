"use client";

import confetti from "canvas-confetti";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import PropTypes from 'prop-types';

// Placeholder for a UI library button. Forwards all props to a standard button element.
const Button = forwardRef(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
));

const ConfettiContext = createContext({});

/**
 * @typedef {object} ConfettiApi
 * @property {(options?: import('canvas-confetti').Options) => void} fire - Fires the confetti effect.
 */

/**
 * A component that renders a canvas for the confetti effect.
 * @param {object} props - The component props.
 * @param {import('canvas-confetti').Options} [props.options] - Default options for confetti.
 * @param {import('canvas-confetti').GlobalOptions} [props.globalOptions] - Global options for the confetti instance.
 * @param {boolean} [props.manualstart=false] - If true, confetti won't fire on mount.
 * @param {React.ReactNode} [props.children] - Children to render.
 * @param {React.Ref<ConfettiApi>} ref - The ref to control the confetti instance.
 */
const ConfettiComponent = forwardRef((props, ref) => {
  const {
    options,
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    children,
    ...rest
  } = props;
  const instanceRef = useRef(null);

  const canvasRef = useCallback(
    (node) => {
      if (node !== null) {
        if (instanceRef.current) return;
        instanceRef.current = confetti.create(node, {
          ...globalOptions,
          resize: true,
        });
      } else {
        if (instanceRef.current) {
          instanceRef.current.reset();
          instanceRef.current = null;
        }
      }
    },
    [globalOptions],
  );

  const fire = useCallback(
    async (opts = {}) => {
      try {
        if (!instanceRef.current) {
          console.error("Confetti instance not created yet.");
          return;
        }
        await instanceRef.current({ ...options, ...opts });
      } catch (error) {
        console.error("Confetti error:", error);
      }
    },
    [options],
  );

  const api = useMemo(
    () => ({
      fire,
    }),
    [fire],
  );

  useImperativeHandle(ref, () => api, [api]);

  useEffect(() => {
    if (!manualstart) {
      (async () => {
        try {
          await fire();
        } catch (error) {
          console.error("Confetti effect error:", error);
        }
      })();
    }
  }, [manualstart, fire]);

  return (
    <ConfettiContext.Provider value={api}>
      <canvas ref={canvasRef} {...rest} />
      {children}
    </ConfettiContext.Provider>
  );
});

ConfettiComponent.displayName = "Confetti";

ConfettiComponent.propTypes = {
  options: PropTypes.object,
  globalOptions: PropTypes.object,
  manualstart: PropTypes.bool,
  children: PropTypes.node,
};

export const Confetti = ConfettiComponent;

/**
 * A button that triggers a confetti effect on click.
 * @param {object} props - The component props, including standard button props.
 * @param {import('canvas-confetti').Options & import('canvas-confetti').GlobalOptions} [props.options] - Confetti options.
 * @param {React.ReactNode} [props.children] - The button content.
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onClick] - An optional click handler to run alongside the confetti effect.
 */
const ConfettiButtonComponent = ({
  options,
  children,
  onClick,
  ...props
}) => {
  const handleClick = async (event) => {
    // Call the original onClick handler if it exists
    if (onClick) {
      onClick(event);
    }

    try {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      await confetti({
        ...options,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
      });
    } catch (error) {
      console.error("Confetti button error:", error);
    }
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};

ConfettiButtonComponent.displayName = "ConfettiButton";

ConfettiButtonComponent.propTypes = {
  options: PropTypes.object,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export const ConfettiButton = ConfettiButtonComponent;
