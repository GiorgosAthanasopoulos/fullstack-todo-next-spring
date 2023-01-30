"use client";

import { putTitle, putDescription, putDeadline } from "@/api/todo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { T_Todo } from "@/interfaces/todo";
import { get } from "@/api/todo";

function Edit({ params }: any): JSX.Element {
    const router = useRouter();
    const [todo, setTodo] = useState<T_Todo>();
    const currentDate = new Date();
    const minDate = `${
        currentDate.getMonth() /
        currentDate.getDate() /
        currentDate.getFullYear()
    }`;

    useEffect(() => {
        async function fetchTodo() {
            setTodo(await get(params.id));
        }
        fetchTodo();
    });

    async function handleEditTodo() {
        if (todo == null) {
            return;
        }

        const title: string = (
            document.getElementById("title-put") as HTMLInputElement
        ).value;
        const description: string = (
            document.getElementById("description-put") as HTMLInputElement
        ).value;
        const deadline: string = (
            document.getElementById("deadline-put") as HTMLInputElement
        ).value;

        await putTitle(todo.id, title);
        await putDescription(todo.id, description);
        await putDeadline(todo.id, deadline);
        router.push("/");
    }

    if (todo == null) {
        return <></>;
    }
    return (
        <>
            <div className="ml-4 mt-4">
                <form onSubmit={handleEditTodo}>
                    <h1 className="text-bold text-2xl">Id: {todo.id}</h1>
                    <br />
                    <label htmlFor="title-put">Title</label>
                    <br />
                    <input
                        type="text"
                        className="text-black"
                        id="title-put"
                        defaultValue={todo.title}
                    />
                    <br />
                    <label htmlFor="description-put">Description</label>
                    <br />
                    <input
                        type="text"
                        id="description-put"
                        className="text-black"
                        defaultValue={todo.description}
                    />
                    <br />
                    <label htmlFor="deadline-put">Deadline</label>
                    <br />
                    <input
                        type="date"
                        id="deadline-put"
                        className="mt-2 bg-yellow-400 text-black border-2 border-solid border-black"
                        defaultValue={todo.deadline.toString()}
                        min={new Date().toISOString().split("T")[0]}
                    />
                    <br />
                    <button
                        className="bg-yellow-400 text-black hover:text-white mt-4 p-2 ml-14"
                        type="submit"
                    >
                        Update
                    </button>
                </form>
            </div>
        </>
    );
}

export default Edit;
