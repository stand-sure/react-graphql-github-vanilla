import { useState } from "react";
import { INITIAL_ORGANIZATION, INITIAL_REPO } from "./getOrganizationDataFromGithub";

/**
 * sets up state hooks for org query and the response (either errors or GitHub organization fields (as set up in the query))
 */
const useAppState = function useAppState() {
    const [organization, setOrganization] = useState({
        name: null,
        url: null,
    });
    
    const [errors, setErrors] = useState(null);

    const [orgQueryParams, setOrgQueryParams] = useState({
        organizationName: INITIAL_ORGANIZATION,
        repo: INITIAL_REPO,
    });

    return {
        organization,
        setOrganization,
        errors,
        setErrors,
        orgQueryParams,
        setOrgQueryParams,
    };
};

export { useAppState };
