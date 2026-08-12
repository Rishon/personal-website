import { useEffect, useRef, useState } from "react";

export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export interface LanyardData {
  discord_status: DiscordStatus;
  active_on_discord_desktop?: boolean;
  active_on_discord_mobile?: boolean;
  active_on_discord_web?: boolean;
}

const SOCKET = "wss://api.lanyard.rest/socket";

const OP_EVENT = 0;
const OP_HELLO = 1;
const OP_INITIALIZE = 2;
const OP_HEARTBEAT = 3;

export const STATUS_META: Record<
  DiscordStatus,
  { label: string; color: string }
> = {
  online: { label: "online", color: "#43b581" },
  idle: { label: "idle", color: "#faa61a" },
  dnd: { label: "busy", color: "#f04747" },
  offline: { label: "offline", color: "#8b8b8b" },
};

// Subscribes to Discord presence over the Lanyard websocket
export function useLanyard(userId?: string) {
  const [data, setData] = useState<LanyardData | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptsRef = useRef(0);

  useEffect(() => {
    if (!userId) return;

    let closed = false;

    const connect = () => {
      if (closed) return;

      const socket = new WebSocket(SOCKET);
      socketRef.current = socket;

      socket.onmessage = (event) => {
        let payload;
        try {
          payload = JSON.parse(event.data);
        } catch {
          return;
        }

        const { op, t, d } = payload;

        if (op === OP_HELLO) {
          attemptsRef.current = 0;
          socket.send(
            JSON.stringify({ op: OP_INITIALIZE, d: { subscribe_to_id: userId } }),
          );
          heartbeatRef.current = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({ op: OP_HEARTBEAT }));
            }
          }, d?.heartbeat_interval ?? 30000);
          return;
        }

        if (op === OP_EVENT && (t === "INIT_STATE" || t === "PRESENCE_UPDATE")) {
          setData(d?.discord_status ? d : (d?.[userId] ?? null));
        }
      };

      socket.onclose = () => {
        if (heartbeatRef.current) clearInterval(heartbeatRef.current);
        heartbeatRef.current = null;
        if (closed) return;

        const delay = Math.min(1000 * 2 ** attemptsRef.current, 30000);
        attemptsRef.current += 1;
        retryRef.current = setTimeout(connect, delay);
      };

      socket.onerror = () => socket.close();
    };

    connect();

    return () => {
      closed = true;
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      if (retryRef.current) clearTimeout(retryRef.current);
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [userId]);

  return data;
}
