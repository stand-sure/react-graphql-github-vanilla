import { useState } from "react";
import { DEFAULT_PATH, INITIAL_ORGANIZATION, INITIAL_REPO } from "./organizationQuery";
export const useAppState = function useAppState() {
    const [path, setPath] = useState(DEFAULT_PATH);
    const [organization, setOrganization] = useState({
        name: null,
        url: null,
    });
    const [organizationName, setOrganizationName] = useState(
        INITIAL_ORGANIZATION
    );
    const [errors, setErrors] = useState(null);
    const [repo, setRepo] = useState(INITIAL_REPO);

    return {
        path,
        setPath,
        organization,
        setOrganization,
        organizationName,
        setOrganizationName,
        errors,
        setErrors,
        repo,
        setRepo,
    };
};
