"use client";

import { get } from "@/api/todo";
import { useEffect, useState } from "react";
import { T_Todo } from "@/interfaces/todo";
import Todo from "@/components/Todo";

export default function TodoView({ params }: any): JSX.Element {
    const [todo, setTodo] = useState<T_Todo>();

    useEffect(() => {
        get(params.id).then((data) => {
            setTodo(data);
        });
    }, [params.id, todo]);

    if (todo == null) return <></>;
    return (
        <>
            <div>
                <Todo todo={todo} showDate={true}></Todo>
            </div>
        </>
    );
}
