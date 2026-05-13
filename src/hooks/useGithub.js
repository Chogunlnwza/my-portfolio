import { useEffect, useState } from "react";

import {
    fetchGithubRepos,
    fetchGithubProfile,
} from "../services/githubService";

export default function useGithub() {

    const [repos, setRepos] = useState([]);
    const [githubProfile, setGithubProfile] =
        useState(null);

    useEffect(() => {

        async function loadGithub() {
            try {
                const reposData =
                    await fetchGithubRepos();
                const profileData =
                    await fetchGithubProfile();
                setRepos(reposData);
                setGithubProfile(profileData);

            } catch (error) {
                console.error(error);
            }
        }
        loadGithub();
    }, []);
    return {
        repos,
        githubProfile,
    };
}