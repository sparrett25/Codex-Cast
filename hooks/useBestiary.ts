import { useEffect, useRef, useState } from "react";
import { BestiaryIndex } from "../lib/schemas";
import { loadBestiary } from "../lib/dataLoader";

type State = { data?: BestiaryIndex; error?: string; loading: boolean };

export function useBestiary() {
  const [state, setState] = useState<State>({ loading: true });
  const fetched = useRef(false); // simple one-shot guard

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    loadBestiary()
      .then(data => setState({ data, loading: false }))
      .catch(err => setState({ error: String(err), loading: false }));
  }, []);

  return state;
}
