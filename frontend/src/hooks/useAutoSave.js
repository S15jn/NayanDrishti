
import { useCallback, useEffect, useRef, useState } from "react";
import API from "../services/api";

const useAutoSave = (data, activeTab, delay = 2000) => {
  const timerRef = useRef(null);
  const statusTimerRef = useRef(null);

  const latestDataRef = useRef(data);

  const lastSavedRef = useRef({
    appointmentId: null,
    snapshot: "",
  });

  const inFlightRef = useRef(false);
  const queuedRef = useRef(false);

  const [status, setStatus] = useState("idle");

  // Always keep latest data
  latestDataRef.current = data;

  // Convert data into a stable snapshot
  const snapshot = JSON.stringify(data);

  const saveNow = useCallback(async () => {
    const currentData = latestDataRef.current;

    if (!currentData?.patientId || !currentData?.appointmentId) {
      return;
    }

    const appointmentId = currentData.appointmentId;
    const currentSnapshot = JSON.stringify(currentData);

    // Skip unchanged data
    if (
      lastSavedRef.current.appointmentId === appointmentId &&
      lastSavedRef.current.snapshot === currentSnapshot
    ) {
      return;
    }

    // Only one API request at a time
    if (inFlightRef.current) {
      queuedRef.current = true;
      return;
    }

    inFlightRef.current = true;
    queuedRef.current = false;

    try {
      setStatus("saving");

      await API.post(
        "/records/save",
        JSON.parse(currentSnapshot)
      );

      // Update only if the same appointment is selected
      if (
        latestDataRef.current?.appointmentId === appointmentId
      ) {
        lastSavedRef.current = {
          appointmentId,
          snapshot: currentSnapshot,
        };

        setStatus("saved");

        clearTimeout(statusTimerRef.current);

        statusTimerRef.current = setTimeout(() => {
          if (
            latestDataRef.current?.appointmentId === appointmentId
          ) {
            setStatus("idle");
          }
        }, 1500);
      }
    } catch (error) {
      console.error("Auto-save failed:", error);

      if (
        latestDataRef.current?.appointmentId === appointmentId
      ) {
        setStatus("error");
      }
    } finally {
      inFlightRef.current = false;

      // If changes happened during the request,
      // wait again before saving the latest data.
      if (queuedRef.current) {
        queuedRef.current = false;

        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
          void saveNow();
        }, delay);
      }
    }
  }, [delay]);

  // Reset when appointment changes
  useEffect(() => {
    clearTimeout(timerRef.current);
    clearTimeout(statusTimerRef.current);

    queuedRef.current = false;

    lastSavedRef.current = {
      appointmentId: data?.appointmentId ?? null,
      snapshot: "",
    };

    setStatus("idle");
  }, [data?.appointmentId]);

  // Debounce using snapshot instead of object reference
  useEffect(() => {
    if (!data?.patientId || !data?.appointmentId) {
      return;
    }

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      void saveNow();
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [
    snapshot,
    data?.patientId,
    data?.appointmentId,
    delay,
    saveNow,
  ]);

  // Cleanup
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(statusTimerRef.current);
    };
  }, []);

  return { status, saveNow };
};

export default useAutoSave;
