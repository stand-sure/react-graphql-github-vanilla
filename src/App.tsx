import React, { useRef, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

type Maybe<T> = T | null | undefined;

const TITLE = "React GraphQL Github Client";

const axiosGithubGraphQL = axios.create({
    baseURL: "https://api.github.com/graphql",
    headers: {
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
});

const GET_ORGANIZATION = `
{
  organization(login: "the-road-to-learn-react"){
    name
    url
  }
}
`;

const Organization = ({ organization }: { organization: Maybe<{ name: string, url: string}> }) => (
    <div>Organization: {organization?.name}</div>
);

const Errors = ({ errors }: { errors: Maybe<{}> }) => (
    <div>Errors: {JSON.stringify(errors)}</div>
);

const App = function App() {
    const [path, setPath] = useState(
        "the-road-to-learn-react/the-road-to-learn-react"
    );

    const [organization, setOrganization] = useState(null);
    const [errors, setErrors] = useState(null);

    const url = useRef(null);

    const fetchDataFromGithub = () => {
        axiosGithubGraphQL.post("", { query: GET_ORGANIZATION }).then((res) => {
            console.log(res);

            setOrganization(res.data.data.organization);
            setErrors(res.data.errors);
        });
    };

    const onSubmit = (ev: FormEvent) => {
        const newPath = ((url.current as any) as HTMLInputElement).value;
        setPath(newPath);

        fetchDataFromGithub();

        ev.preventDefault();
    };

    useEffect(() => {
        fetchDataFromGithub();
    }, [path]);

    return (
        <div>
            <header style={{ textAlign: "center", backgroundColor: "cyan" }}>
                {TITLE}
            </header>
            <form onSubmit={onSubmit}>
                <label htmlFor="url">
                    Show open issues for https://github.com/
                </label>
                <input
                    id="url"
                    type="text"
                    ref={url}
                    style={{ width: "300px" }}
                    placeholder="user/repo"
                    defaultValue={path}
                />
                <button type="submit">Search</button>
            </form>
            <hr />
            <Organization organization={organization} />
            <Errors errors={errors} />
        </div>
    );
};

export default App;
