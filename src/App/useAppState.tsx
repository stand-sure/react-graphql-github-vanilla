import { useState } from "react";

import {
    INITIAL_ORGANIZATION,
    INITIAL_REPO,
} from "./getOrganizationDataFromGithub";

import { RepositoryShape } from "../Repository";

type Maybe<T> = T | null | undefined;

type OrganizationShape = {
    name: Maybe<string>;
    url: Maybe<string>;
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

/**
 * sets up state hooks for org query and the response (either errors or GitHub organization fields (as set up in the query))
 */
const useAppState = function useAppState() {
    const [organization, setOrganization] = useState<Maybe<OrganizationShape>>(
        null
    );

    const [errors, setErrors] = useState<Maybe<Array<ErrorShape>>>(null);

    const [orgQueryParams, setOrgQueryParams] = useState<OrgQueryParamsShape>({
        organizationName: INITIAL_ORGANIZATION,
        repo: INITIAL_REPO,
    });

    const [repository, setRepository] = useState<RepositoryShape>(null);

    const setGithubResponse = function setGithubResponse({
        data,
        errors,
    }: GithubResponseShape) {
        setErrors(errors ?? []);
        setOrganization(data?.organization);
        setRepository(data?.organization?.repository);
    };

    return {
        errors,
        organization,
        orgQueryParams,
        repository,
        setGithubResponse,
        setOrgQueryParams,
    };
};

export { useAppState };
