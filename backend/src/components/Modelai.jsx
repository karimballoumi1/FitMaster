
import React, { useEffect } from 'react';

const Modelai = () => {
  useEffect(() => {
    // Check if Chatbase is already loaded
    if (window.chatbase && window.chatbase("getState") === "initialized") {
      return; // Chatbase is already loaded, do nothing
    }

    // Create Chatbase queue if it doesn't exist
    if (!window.chatbase) {
      window.chatbase = (...args) => {        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q;
          }
          return (...args) => target(prop, ...args);
        },
      });
    }

    const onLoad = () => {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "VgOTHssuFjmZU8r3lyN-E"; // Replace with your actual ID
      script.domain = "www.chatbase.co"; // Replace with your actual domain
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("load", onLoad);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

 
};

export default Modelai;

