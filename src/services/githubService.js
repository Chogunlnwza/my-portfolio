export async function fetchGithubRepos() {

  const response = await fetch(
    "https://api.github.com/users/Chogunlnwza/repos"
  );

  return response.json();
}

export async function fetchGithubProfile() {

  const response = await fetch(
    "https://api.github.com/users/Chogunlnwza"
  );

  return response.json();
}