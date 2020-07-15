import React from "react";
import { Errors } from "../Errors";

type Maybe<T> = T | null | undefined;
type OrganizationProps = {
    organization: Maybe<{ name: string; url: string }>;
    errors?: Maybe<Array<{ message: string }>>;
};

const Organization = function Organization({
    organization,
    errors,
}: OrganizationProps) {
    if (errors) {
        return (
            <div>
                <p>
                    <Errors errors={errors} />
                </p>
            </div>
        );
    }
    return (
        <div>
            <p>
                <strong>Issues for Organization: </strong>
                <a href={organization?.url}>{organization?.name}</a>
            </p>
        </div>
    );
};

export { Organization };
