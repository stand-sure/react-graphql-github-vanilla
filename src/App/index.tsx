import React, { useRef, FormEvent, Suspense } from "react";
import { Organization } from "../Organization";
import { Repository } from "../Repository";
import { getDataFromGithub } from "../getOrganizationDataFromGithub";
import { useAppState } from "./useAppState";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const TITLE = "React GraphQL Github Client";

const App = function App() {
    const {
        errors,
        issues,
        organization,
        orgQueryParams,
        repository,
        setGithubResponse,
        setOrgQueryParams,
    } = useAppState();

    const url = useRef<HTMLInputElement>(null);

    const onSubmit = (ev: FormEvent) => {
        const newPath = url.current?.value ?? "";
        const [newName, newRepo] = newPath.split("/");

        if (!newName || !newRepo) {
            return;
        }

        setOrgQueryParams({ organizationName: newName, repo: newRepo });
        getDataFromGithub({ ...orgQueryParams }).then((res) => {
            setGithubResponse({ ...res.data });
        });
        ev.preventDefault();
    };

    return (
        <div className="p-1">
            <header
                style={{ textAlign: "center", backgroundColor: "cyan" }}
                className="p-1 text-white bg-info"
            >
                {TITLE}
            </header>
            <form onSubmit={onSubmit} className="form-inline mt-2 mx-3">
                <label htmlFor="url">
                    Show open issues for https://github.com/
                </label>
                <input
                    id="url"
                    type="text"
                    className="form-control mr-2 w-50"
                    ref={url}
                    placeholder="user/repo"
                    defaultValue={`${orgQueryParams.organizationName}/${orgQueryParams.repo}`}
                />
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>
            <hr />
            <Suspense fallback={<em>loading...</em>}>
                <p className="mx-3">
                    <Organization organization={organization} errors={errors} />
                    <Repository repository={repository} />
                </p>
            </Suspense>
        </div>
    );
};

export default App;
