import { useState } from "react";

import {
    INITIAL_ORGANIZATION,
    INITIAL_REPO,
} from "./getOrganizationDataFromGithub";

import { RepositoryShape } from "../Repository";

type Maybe<T> = T | null | undefined;

type OrganizationShape = {
    name: string;
    url: string;
    repository?: RepositoryShape;
};

type OrgQueryParamsShape = {
    organizationName: string;
    repo: string;
    cursor?: string;
};

type ErrorShape = { message: string };

type GithubResponseShape = {
    data?: {
        organization: OrganizationShape;
    };
    errors?: Array<ErrorShape>;
};

type StateShape = {
    organization: OrganizationShape;
    errors: Maybe<Array<ErrorShape>>;
    repository: RepositoryShape;
};

/**
 * sets up state hooks for org query and the response (either errors or GitHub organization fields (as set up in the query))
 */
const useAppState = function useAppState() {
    const [queryParameters, setQueryParameters] = useState<OrgQueryParamsShape>(
        {
            organizationName: INITIAL_ORGANIZATION,
            repo: INITIAL_REPO,
        }
    );

    const [state, setState] = useState<StateShape>({
        organization: {
            name: "",
            url: "",
        },
        errors: [],
        repository: undefined,
    });

    const setGithubResponse = function setGithubResponse({
        data,
        errors,
    }: GithubResponseShape) {
        setState({
            organization: {
                name: data?.organization?.name ?? "",
                url: data?.organization?.url ?? "",
            },
            errors: errors ?? [],
            repository: data?.organization?.repository,
        });
    };

    const updateRepositoryStarStatus = function updateRepositoryStarStatus(
        starred: boolean
    ) {
        setState({
            ...state,
            repository: {
                ...state.repository,
                viewerHasStarred: starred
            }
        })
    };

    return {
        state,
        setState,
        queryParameters,
        setQueryParameters,
        setGithubResponse,
        updateRepositoryStarStatus,
    };
};

export { useAppState };
