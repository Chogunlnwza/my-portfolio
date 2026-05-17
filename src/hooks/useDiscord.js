import { useEffect, useState, useCallback } from "react";
import { fetchDiscordData } from "../services/discordService";

export default function useDiscord() {
  const [discordData, setDiscordData] = useState(null);
  const [discordLoading, setDiscordLoading] = useState(true);

  const loadDiscord = useCallback(async () => {
    try {
      setDiscordLoading(true);
      const data = await fetchDiscordData();
      if (data && data.discord_user) {
        setDiscordData(data);
      }
    } catch (error) {
      console.error("Discord fetch error:", error);
    } finally {
      setDiscordLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDiscord();
    // Refresh every 30 seconds to keep status live
    const interval = setInterval(loadDiscord, 30000);
    return () => clearInterval(interval);
  }, [loadDiscord]);

  return { discordData, discordLoading };
}