import { useEffect, useState } from "react";
import { isLive } from "../config/project";
import { fetchLiveData } from "../services/data";
import type { DataState } from "../types/data";

const REFRESH_MS = 25_000;

export function useLiveData(): DataState {
  const [state, setState] = useState<DataState>(
    isLive
      ? { status: "loading", data: null, error: null }
      : { status: "prelaunch", data: null, error: null },
  );

  useEffect(() => {
    if (!isLive) return;

    let active = true;
    let timer: number | undefined;
    const controller = new AbortController();

    const load = async () => {
      try {
        const data = await fetchLiveData(controller.signal);
        if (!active) return;
        setState(
          data
            ? { status: "ready", data, error: null }
            : { status: "empty", data: null, error: null },
        );
      } catch (error) {
        if (!active || controller.signal.aborted) return;
        setState({
          status: "error",
          data: null,
          error: error instanceof Error ? error.message : "Live data is temporarily unavailable",
        });
      } finally {
        if (active) timer = window.setTimeout(load, REFRESH_MS);
      }
    };

    void load();
    return () => {
      active = false;
      controller.abort();
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return state;
}
