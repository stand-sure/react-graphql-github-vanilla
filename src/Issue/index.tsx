import React from "react";
import { ReactionsList, ReactionsListPropsShape } from "../ReactionsList";

type PropsShape = {
    issue: {
        node: {
            id: string;
            title: string;
            url: string;
            reactions: ReactionsListPropsShape["reactions"];
        };
    };
};

const Issue = function Issue({ issue }: PropsShape) {
    return (
        <li>
            <a href={issue.node.url} target="_blank" rel="noopener noreferrer">
                {issue.node.title}
            </a>
            <ReactionsList reactions={issue.node.reactions} />
        </li>
    );
};

export type IssuePropsShape = PropsShape;
export { Issue };
