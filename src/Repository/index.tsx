import React from "react";

type Maybe<T> = T | null | undefined;

type IssueShape = {
    id: string;
    title: string;
    url: string;
};

type IssuesShape = {
    edges: Array<{ node: IssueShape }>;
};

export type RepositoryShape = {
    name?: Maybe<string>;
    url?: Maybe<string>;
    issues?: Maybe<IssuesShape>;
};

type RepositoryPropsShape = {
    repository: RepositoryShape;
};

const Repository = function Repository({ repository }: RepositoryPropsShape) {
    if (repository) {
        return (
            <div>
                <p>
                    <strong>In Repository:</strong>{" "}
                    <a href={repository.url ?? ""}>{repository.name}</a>
                </p>
                <ul>
                    {repository.issues?.edges.map((issue) => (
                        <li key={issue.node.id}>
                            <a href={issue.node.url}>{issue.node.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else {
        return <></>;
    }
};

export { Repository };
