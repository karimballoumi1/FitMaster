import React, { useEffect } from 'react';

const Voice = () => {
  useEffect(() => {
    // Check if the script is already loaded
    if (!document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://elevenlabs.io/convai-widget/index.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50"> {/* Corrected classes */}
      <elevenlabs-convai agent-id="tI66jLSj1mwD9Fo1x08Y"></elevenlabs-convai>
    </div>
  );
};

export default Voice;
