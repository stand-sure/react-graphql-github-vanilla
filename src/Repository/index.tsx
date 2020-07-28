import React from "react";
import { StarIcon, StarFillIcon } from "@primer/octicons-react";

import { IssueList, IssueListPropsShape } from "../IssueList";

type Maybe<T> = T | null | undefined;

export type RepositoryShape = Maybe<
    {
        id?: Maybe<string>;
        name?: Maybe<string>;
        url?: Maybe<string>;
        viewerHasStarred?: Maybe<boolean>;
    } & IssueListPropsShape
>;

type RepositoryPropsShape = {
    repository: RepositoryShape;
    fetchMoreIssues?: () => void;
    toggleStar?: () => void;
};

const Repository = function Repository({
    repository,
    fetchMoreIssues,
    toggleStar,
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
                    <button
                        type="button"
                        className={`btn btn-sm text-warning`}
                        onClick={toggleStar}
                    >
                        {Boolean(repository.viewerHasStarred) ? (
                            <StarFillIcon aria-label="un-star" />
                        ) : (
                            <StarIcon aria-label="star" />
                        )}
                    </button>
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
