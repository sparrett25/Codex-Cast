
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/DeepDiveLink.css';

const toneStyles = {
  reflective: 'deep-dive-reflective',
  excited: 'deep-dive-excited',
  focused: 'deep-dive-focused',
  neutral: 'deep-dive-neutral',
};

export default function DeepDiveLink({ type, scrollKey, context = {}, tone = 'neutral', onTrigger }) {
  const handleClick = () => {
    if (onTrigger) {
      onTrigger({ type, scrollKey, context, tone });
    } else {
      console.log('🌀 Deep Dive Triggered:', { type, scrollKey, context, tone });
      // Placeholder for opening the Deep Dive Modal
      // In final app, this would connect to a modal state or context handler
    }
  };

  return (
    <button
      className={`deep-dive-link ${toneStyles[tone] || ''}`}
      onClick={handleClick}
      title="Open Deep Dive"
    >
      📜 Open Deep Dive
    </button>
  );
}

DeepDiveLink.propTypes = {
  type: PropTypes.string.isRequired,
  scrollKey: PropTypes.string.isRequired,
  context: PropTypes.object,
  tone: PropTypes.string,
  onTrigger: PropTypes.func,
};
