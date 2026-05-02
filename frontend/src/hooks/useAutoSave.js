import { useCallback, useEffect, useRef, useState } from "react";
import API from "../services/api";

const useAutoSave = (data, activeTab, delay = 1500) => {
  const timerRef = useRef(null);
  const prevTabRef = useRef(activeTab);
  const lastSavedRef = useRef("");

  const [status, setStatus] = useState("idle");

  const canSave = Boolean(data?.patientId && data?.appointmentId);

  const saveNow = useCallback(async () => {
    if (!canSave) return;

    const snapshot = JSON.stringify(data);
    if (snapshot === lastSavedRef.current) return;

    try {
      setStatus("saving");
      await API.post("/records/save", data);

      lastSavedRef.current = snapshot;
      setStatus("saved");

      setTimeout(() => setStatus("idle"), 1200);
    } catch (err) {
      console.error("Save failed:", err);
      setStatus("error");
    }
  }, [canSave, data]);

  useEffect(() => {
    if (!canSave) return;

    if (prevTabRef.current !== activeTab) {
      prevTabRef.current = activeTab;
      saveNow();
      return;
    }

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(saveNow, delay);

    return () => clearTimeout(timerRef.current);
  }, [activeTab, canSave, data, delay, saveNow]);

  useEffect(() => {
    lastSavedRef.current = "";
  }, [data?.appointmentId]);

  return { status, saveNow };
};

export default useAutoSave;
