"use client";

import { getAllDeleted, undelete, undeleteAll } from "@/api/todo";
import React, { useEffect, useState } from "react";
import { T_Todo } from "@/interfaces/todo";
import Todo from "@/components/Todo";

function Trash(): JSX.Element {
    const [todos, setTodos] = useState([] as T_Todo[]);

    useEffect(() => {
        getAllDeleted().then((data) => {
            setTodos(data);
        });
    }, [todos]);

    return (
        <>
            <div className="my-4">
                <div className="grid grid-cols-4">
                    {todos.map((todo) => {
                        return (
                            <Todo
                                xonclick={(e: React.MouseEvent) => {
                                    undelete(todo.id);
                                }}
                                key={todos.indexOf(todo)}
                                todo={todo}
                            ></Todo>
                        );
                    })}
                </div>
                <button
                    onClick={async () => {
                        await undeleteAll();
                    }}
                    className="bg-yellow-400 text-black hover:text-white p-2 mr-4 float-right mb-4"
                >
                    Recover all
                </button>
            </div>
        </>
    );
}

export default Trash;
