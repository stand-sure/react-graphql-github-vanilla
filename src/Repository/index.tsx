import React from "react";

import { IssueList, IssueListPropsShape } from "../IssueList";

type Maybe<T> = T | null | undefined;

export type RepositoryShape = Maybe<
    {
        name?: Maybe<string>;
        url?: Maybe<string>;
    } & IssueListPropsShape
>;

type RepositoryPropsShape = {
    repository: RepositoryShape;
    fetchMoreIssues?: () => void;
};

const Repository = function Repository({
    repository,
    fetchMoreIssues,
}: RepositoryPropsShape) {
    if (repository && repository.name) {
        return (
            <div>
                <div>
                    <strong>In Repository:</strong>{" "}
                    <a
                        href={repository.url ?? ""}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {repository.name}
                    </a>
                </div>
                <IssueList
                    issues={repository.issues}
                    fetchMoreIssues={fetchMoreIssues}
                />
            </div>
        );
    } else {
        return <></>;
    }
};

export { Repository };
