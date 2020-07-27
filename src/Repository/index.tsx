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
};

const fetchMoreIssues = function fetchMoreIssues() {};

const Repository = function Repository({ repository }: RepositoryPropsShape) {
    if (repository && repository.name) {
        return (
            <div>
                <p>
                    <strong>In Repository:</strong>{" "}
                    <a href={repository.url ?? ""}>{repository.name}</a>
                </p>
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
