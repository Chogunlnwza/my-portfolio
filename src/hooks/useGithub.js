import { useEffect, useState } from "react";

import {
    fetchGithubRepos,
    fetchGithubProfile,
} from "../services/githubService";

export default function useGithub() {
    const [repos, setRepos] = useState([]);
    const [githubProfile, setGithubProfile] = useState(null);
    const [githubLoading, setGithubLoading] = useState(true);

    useEffect(() => {
        async function loadGithub() {
            try {
                setGithubLoading(true);
                const reposData = await fetchGithubRepos();
                const profileData = await fetchGithubProfile();
                setRepos(reposData);
                setGithubProfile(profileData);
            } catch (error) {
                console.error(error);
            } finally {
                setGithubLoading(false);
            }
        }
        loadGithub();
    }, []);

    return {
        repos,
        githubProfile,
        githubLoading,
    };
}