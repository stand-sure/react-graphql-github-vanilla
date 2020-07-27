import React from "react";
import { Issue, IssuePropsShape } from "../Issue";

type PropsShape = {
    issues: {
        edges: Array<IssuePropsShape["issue"]>;
        totalCount?: number;
        pageInfo?: {
            endCursor?: string;
            hasNextPage: boolean;
        };
    };
    fetchMoreIssues: () => void;
};

const IssueList = function IssueList({ issues }: PropsShape) {
    if (!issues?.edges?.length) {
        return <></>;
    }

    return (
        <>
            <ul>
                {issues.edges.map((issue) => (
                    <Issue issue={issue} key={issue.node.id} />
                ))}
            </ul>
            {issues.pageInfo?.hasNextPage && <button className="btn btn-secondary">More</button>}
        </>
    );
};

export type IssueListPropsShape = PropsShape;
export { IssueList };
