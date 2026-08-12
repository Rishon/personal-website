import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

export const SOUND_PREF_KEY = "click-sound";

type Ctor = typeof AudioContext;

let enabled = true;
let hydrated = false;
const listeners = new Set<() => void>();

// Registers a component to react to preference changes
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return enabled;
}

function getServerSnapshot() {
  return true;
}

// Writes the preference and notifies every mounted consumer
function setEnabled(next: boolean) {
  enabled = next;
  try {
    localStorage.setItem(SOUND_PREF_KEY, next ? "on" : "off");
  } catch {}
  listeners.forEach((listener) => listener());
}

// Resolves the AudioContext constructor across browsers
function getAudioContext(): Ctor | null {
  if (typeof window === "undefined") return null;
  return (
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: Ctor }).webkitAudioContext ||
    null
  );
}

// Builds a short burst of noise used as the strike transient
function noiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const frames = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
  }
  return buffer;
}

// Plays a soft muted tock built from a noise transient and a decaying tone
function strike(ctx: AudioContext) {
  const now = ctx.currentTime;

  const out = ctx.createGain();
  out.gain.value = 0.5;
  out.connect(ctx.destination);

  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer(ctx, 0.03);

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 1900;
  noiseFilter.Q.value = 0.8;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.16, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

  noise.connect(noiseFilter).connect(noiseGain).connect(out);

  const tone = ctx.createOscillator();
  tone.type = "triangle";
  tone.frequency.setValueAtTime(1080, now);
  tone.frequency.exponentialRampToValueAtTime(520, now + 0.05);

  const toneFilter = ctx.createBiquadFilter();
  toneFilter.type = "lowpass";
  toneFilter.frequency.value = 2600;

  const toneGain = ctx.createGain();
  toneGain.gain.setValueAtTime(0.0001, now);
  toneGain.gain.exponentialRampToValueAtTime(0.09, now + 0.005);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

  tone.connect(toneFilter).connect(toneGain).connect(out);

  noise.start(now);
  noise.stop(now + 0.03);
  tone.start(now);
  tone.stop(now + 0.06);
}

// Exposes the navigation click sound and its shared on/off preference
export function useClickSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (hydrated) return;
    hydrated = true;
    try {
      setEnabled(localStorage.getItem(SOUND_PREF_KEY) !== "off");
    } catch {}
  }, []);

  const play = useCallback(() => {
    if (!enabled) return;

    const Ctor = getAudioContext();
    if (!Ctor) return;

    try {
      if (!ctxRef.current) ctxRef.current = new Ctor();
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") void ctx.resume();
      strike(ctx);
    } catch {}
  }, []);

  const toggle = useCallback(() => setEnabled(!enabled), []);

  return { play, toggle, enabled: active };
}
