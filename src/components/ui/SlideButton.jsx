import { useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';

/**
 * SlideButton — theme-adaptive border + slide-up blue fill on hover.
 * Uses React state + inline styles — no CSS injection, no pseudo-elements.
 * Pure React approach for maximum compatibility.
 */
export default function SlideButton({
  as: Tag = 'button',
  children,
  className = '',
  style = {},
  ...props
}) {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);
  const borderColor = theme === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <Tag
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        border: `1px solid ${borderColor}`,
        color: hovered ? '#ffffff' : 'var(--text-primary)',
        background: 'transparent',
        transition: 'color 0.2s ease',
        ...style,
      }}
      {...props}
    >
      {/* Slide-up fill */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: '#0066FF',
          transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'bottom',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
        }}
      />
      {/* Content above fill */}
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'inherit',
          width: '100%',
          gap: 'inherit',
        }}
      >
        {children}
      </span>
    </Tag>
  );
}