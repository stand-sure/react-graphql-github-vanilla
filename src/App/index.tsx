import React, { useRef, FormEvent, useEffect, useCallback } from "react";
import { Organization } from "../Organization";
import { Repository } from "../Repository";
import { getDataFromGithub } from "../getOrganizationDataFromGithub";
import { useAppState } from "../useAppState";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const TITLE = "React GraphQL Github Client";

type Maybe<T> = T | null | undefined;

const App = function App() {
    const {
        organization,
        setOrganization,
        errors,
        setErrors,
        orgQueryParams,
        setOrgQueryParams,
        repository,
        setRepository,
    } = useAppState();

    const url = useRef<HTMLInputElement>(null);

    const fetchDataFromGithub = useCallback(
        () =>
            getDataFromGithub({ ...orgQueryParams }).then((res) => {
                setOrganization({ ...res.data.data.organization });
                setErrors(res.data.errors);
                setRepository(res.data.data.organization?.repository);
            }),
        [orgQueryParams, setOrganization, setErrors, setRepository]
    );

    useEffect(() => {
        fetchDataFromGithub();

        return () => {
            // TODO - is there anything to clean up?
        };
    }, [fetchDataFromGithub]);

    const onSubmit = (ev: FormEvent) => {
        const newPath = url.current?.value ?? "";
        const [newName, newRepo] = newPath.split("/");

        if (!newName || !newRepo) {
            return;
        }

        setOrgQueryParams({ organizationName: newName, repo: newRepo });

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
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <hr />
            <p className="mx-3">
                <Organization organization={organization} errors={errors} />
                <Repository repository={repository} />
            </p>
        </div>
    );
};

export default App;
