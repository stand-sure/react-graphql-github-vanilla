import React from "react";

type PropsShape = {
    reaction: {
        node: {
            id: string;
            content: string;
        };
    };
};

const ReactionItem = function ReactionItem({ reaction }: PropsShape) {
    return <li>{reaction.node.content}</li>;
};

export type ReactionItemPropsShape = PropsShape;
export { ReactionItem };
