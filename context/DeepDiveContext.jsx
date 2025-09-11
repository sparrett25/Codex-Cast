
import React, { createContext, useContext, useState, useCallback } from 'react';

const DeepDiveContext = createContext();

export function DeepDiveProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollKey, setScrollKey] = useState(null);
  const [tone, setTone] = useState('neutral');
  const [context, setContext] = useState({});

  const openDeepDive = useCallback(({ scrollKey, tone = 'neutral', context = {} }) => {
    setScrollKey(scrollKey);
    setTone(tone);
    setContext(context);
    setIsOpen(true);
  }, []);

  const closeDeepDive = useCallback(() => {
    setIsOpen(false);
    setScrollKey(null);
    setTone('neutral');
    setContext({});
  }, []);

  return (
    <DeepDiveContext.Provider
      value={{ isOpen, scrollKey, tone, context, openDeepDive, closeDeepDive }}
    >
      {children}
    </DeepDiveContext.Provider>
  );
}

export function useDeepDive() {
  return useContext(DeepDiveContext);
}
