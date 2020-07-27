import React from "react";
import { Errors } from "../Errors";

type Maybe<T> = T | null | undefined;
type OrganizationProps = {
    organization: Maybe<{ name: string; url: string }>;
    errors?: Array<{ message: string }>;
};

const Organization = function Organization({
    organization,
    errors,
}: OrganizationProps) {
    if (errors?.length) {
        return (
            <div>
                <div>
                    <Errors errors={errors} />
                </div>
            </div>
        );
    }

    return (
        <div>
            <div>
                <strong>Issues for Organization: </strong>
                <a
                    href={organization?.url ?? ""}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {organization?.name}
                </a>
            </div>
        </div>
    );
};

export { Organization };
