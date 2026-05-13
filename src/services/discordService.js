export async function fetchDiscordData() {

  const response = await fetch(
    "https://api.lanyard.rest/v1/users/439012664627429377"
  );

  const data = await response.json();

  return data.data;
}