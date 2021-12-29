import React, { useState, useEffect } from 'react';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {

    const [githubUser, setGithubUser] = useState({});
    const [repo, setRepo] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [request, setRequest] = useState(0);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState({show:false, msg:''});

    const searchGithubUser = async (user='sanuja-gayantha') => {
        toggleError();
        setIsLoading(true);

        // [Get User](https://api.github.com/users/sanuja-gayantha)
        const response = await axios(`${rootUrl}/users/${user}`).catch((err) => console.log(err));
        if(response){
            setGithubUser(response.data);
            const{login, followers_url} = response.data;

            // [Repos](https://api.github.com/users/sanuja-gayantha/repos?per_page=100)

            // [Followers]

            await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`), axios(`${followers_url}?per_page=100`)]).then((results) => {
                const [repo, followers] = results;
                const status = 'fulfilled';

                if(repo.status === status) {
                    setRepo(repo.value.data);
                }
                if(followers.status === status) {
                    setFollowers(followers.value.data);
                }
            }).catch((err) => console.log(err));        

        }else{
            toggleError(true, 'no user found!');
        }

        checkRequest();
        setIsLoading(false);
    }

    const checkRequest = () => {

        // [Rate Limit](https://api.github.com/rate_limit)
        const response = axios(`${rootUrl}/rate_limit`).then(({data}) => {
            let {rate:{remaining}} = data;
            // remaining = 0;
            setRequest(remaining);
            if(remaining === 0){
                toggleError(true, 'Number Of Request per hour Exceeded. Try After Sometime...');
            }

        }).catch((err) => console.log(err));
    }

    const toggleError = (show=false, msg='') => {
        setError({show, msg});
    }

    useEffect(() => {
        searchGithubUser();
        checkRequest();
    }, []);

    return (
        <GithubContext.Provider value={{githubUser, repo, followers, request, error, searchGithubUser, isloading, setIsLoading}}>
            {children}
        </GithubContext.Provider>
    );
}

export {GithubContext, GithubProvider}