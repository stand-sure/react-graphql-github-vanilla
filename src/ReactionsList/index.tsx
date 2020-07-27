import React from "react";
import { ReactionItem, ReactionItemPropsShape } from "../ReactionItem";

type PropsShape = {
    reactions: {
        edges: Array<ReactionItemPropsShape["reaction"]>;
    };
};

const ReactionsList = function ReactionsList({ reactions }: PropsShape) {
    return (reactions && reactions.edges?.length > 0) ? (
        <ul>
            {reactions.edges.map((reaction) => (
                <ReactionItem reaction={reaction} key={reaction.node.id} />
            ))}
        </ul>
    ) : (
        <></>
    );
};

export type ReactionsListPropsShape = PropsShape;
export { ReactionsList };
