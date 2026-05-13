import { useEffect, useState } from "react";
import { fetchDiscordData } from "../services/discordService";

export default function useDiscord() {

  const [discordData, setDiscordData] = useState(null);

  useEffect(() => {

    async function loadDiscord() {
      try {
        const data = await fetchDiscordData();
        setDiscordData(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadDiscord();

  }, []);

  return { discordData };
}