import React, { useRef, FormEvent, useEffect, Suspense } from "react";
import { Organization } from "../Organization";
import { Repository } from "../Repository";
import { getDataFromGithub } from "./getOrganizationDataFromGithub";
import { useAppState } from "./useAppState";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const TITLE = "React GraphQL Github Client";

function ErrorFallback({
    error,
    componentStack,
    resetErrorBoundary,
}: FallbackProps) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error?.message}</pre>
            <pre>{componentStack}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}

const App = function App() {
    const {
        state,
        setGithubResponse,
        queryParameters,
        setQueryParameters,
    } = useAppState();

    const defaultOrganizationName = queryParameters.organizationName;
    const defaultRepoName = queryParameters.repo;

    const url = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getDataFromGithub({ ...queryParameters }).then((res) => {
            const data = { ...res.data };
            if (
                data?.data?.organization?.name === state.organization?.name &&
                data?.data?.organization?.repository?.name ===
                    state.repository?.name &&
                state.repository?.issues?.edges?.length
            ) {
                data.data.organization.repository.issues.edges = [
                    ...state.repository.issues.edges,
                    ...data.data.organization.repository.issues.edges,
                ];
            }

            setGithubResponse(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParameters]);

    const onSubmit = (ev: FormEvent) => {
        ev.preventDefault();

        setGithubResponse({ data: undefined, errors: undefined });

        const newPath = url.current?.value ?? " / ";
        const [newName, newRepo] = newPath.split("/");

        if (!newName || !newRepo) {
            return;
        }

        setQueryParameters({
            organizationName: newName,
            repo: newRepo,
            cursor: undefined,
        });
    };

    const onFetchMoreIssues = function onFetchMoreIssues() {
        const cursor = state.repository?.issues?.pageInfo?.endCursor;
        setQueryParameters({ ...queryParameters, cursor });
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
                    defaultValue={`${defaultOrganizationName}/${defaultRepoName}`}
                />
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>
            <hr />
            <Suspense fallback={<em>loading...</em>}>
                <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => {
                        setQueryParameters({
                            organizationName: "",
                            repo: "",
                        });
                    }}
                >
                    <div className="mx-3">
                        <Organization
                            organization={{ ...state.organization }}
                            errors={state.errors ?? []}
                        />
                        <Repository
                            repository={state.repository}
                            fetchMoreIssues={onFetchMoreIssues}
                        />
                    </div>
                </ErrorBoundary>
            </Suspense>
        </div>
    );
};

export default App;
