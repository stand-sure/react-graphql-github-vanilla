import React, { useRef, FormEvent, useEffect, useCallback } from "react";
import "./App.css";
import { Organization } from "../Organization";
import { Repository } from "../Repository";
import { getDataFromGithub } from "../getOrganizationDataFromGithub";
import { useAppState } from "../useAppState";

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
                setRepository(res.data.data.organization.repository);
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
                    defaultValue={`${orgQueryParams.organizationName}/${orgQueryParams.repo}`}
                />
                <button type="submit">Search</button>
            </form>
            <hr />
            <Organization organization={organization} errors={errors} />
            <Repository repository={repository} />
        </div>
    );
};

export default App;
