import React from "react";

type Maybe<T> = T | null | undefined;
type ErrorsProps = { errors?: Maybe<Array<{ message: string }>> };

const Errors = ({ errors }: ErrorsProps) =>
    errors && errors.length ? (
        <div>
            <strong>Something went wrong: </strong>
            {(errors || []).map((error) => error.message).join(" ")}
        </div>
    ) : (
        <></>
    );

export { Errors };
