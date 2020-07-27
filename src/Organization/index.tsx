import React, { Suspense } from "react";
import { Errors } from "../Errors";

type Maybe<T> = T | null | undefined;
type OrganizationProps = {
    organization: Maybe<{ name: Maybe<string>; url: Maybe<string> }>;
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

    if (organization && organization.url) {
        return (
            <Suspense fallback="Loading issues...">
                <div>
                    <p>
                        <strong>Issues for Organization: </strong>
                        <a href={organization?.url}>{organization?.name}</a>
                    </p>
                </div>
            </Suspense>
        );
    } else {
        return <></>;
    }
};

export { Organization };
