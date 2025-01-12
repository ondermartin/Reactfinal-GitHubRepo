import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface Repo {
    id: number;
    name: string;
    description: string;
}

interface GithubContextType {
    repos: Repo[];
    fetchRepos: () => void;
}

export const GithubContext = createContext<GithubContextType>({
    repos: [],
    fetchRepos: () => { },
});

export const GithubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [repos, setRepos] = useState<Repo[]>([]); // 
    const fetchRepos = async () => {
        try {
            const response = await axios.get('https://api.github.com/users/your-username/repos');
            setRepos(response.data);
        } catch (error) {
            console.error('Error fetching repositories:', error);
        }
    };

    useEffect(() => {
        fetchRepos();
    }, []);

    return (
        <GithubContext.Provider value={{ repos, fetchRepos }}>
            {children}
        </GithubContext.Provider>
    );
};
