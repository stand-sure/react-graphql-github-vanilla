import React from "react";
import {
    HeartFillIcon,
    ThumbsupIcon,
    ThumbsdownIcon,
    RocketIcon,
    EyeIcon,
} from "@primer/octicons-react";

type PropsShape = {
    reaction: {
        node: {
            id: string;
            content: string;
        };
    };
};

const ReactionItem = function ReactionItem({ reaction }: PropsShape) {
    let content;
    switch (reaction.node.content) {
        case "HEART":
            content = <HeartFillIcon />;
            break;
        case "THUMBS_UP":
            content = <ThumbsupIcon />;
            break;
        case "THUMBS_DOWN":
            content = <ThumbsdownIcon />;
            break;
        case "ROCKET":
            content = <RocketIcon />;
            break;
        case "EYES":
            content = <><EyeIcon /><EyeIcon /></>;
            break;
        default:
            content = <>{reaction.node.content}</>;
            break;
    }
    return <li>{content}</li>;
};

export type ReactionItemPropsShape = PropsShape;
export { ReactionItem };
