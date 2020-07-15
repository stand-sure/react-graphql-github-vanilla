import React, { useRef, FormEvent, useEffect } from "react";
import axios from "axios";
import "./App.css";

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

const App = function App() {
    const defaultPath = "the-road-to-learn-react/the-road-to-learn-react";
    // const [path, setPath] = useState(
    //     "the-road-to-learn-react/the-road-to-learn-react"
    // );

    const url = useRef(null);

    const onSubmit = (ev: FormEvent) => {
        // const path = ((url.current as any) as HTMLInputElement).value;
        // console.log(path);
        axiosGithubGraphQL.post("", { query: GET_ORGANIZATION }).then((res) => {
            console.log(res);
        });

        ev.preventDefault();
    };

    useEffect(
        () => {
            // fetch data
        },
        [
            /*dependencies TBD*/
        ]
    );

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
                    defaultValue={defaultPath}
                />
                <button type="submit">Search</button>
            </form>
            <hr />
            <div>TODO results</div>
        </div>
    );
};

export default App;
