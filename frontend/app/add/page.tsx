"use client";

import { post } from "@/api/todo";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Add(): JSX.Element {
    const router = useRouter();

    async function handleAddNewTodo(e: FormEvent) {
        e.preventDefault();
        const title: string = (
            document.getElementById("title") as HTMLInputElement
        ).value;
        const description: string = (
            document.getElementById("description") as HTMLInputElement
        ).value;
        const deadline: string = (
            document.getElementById("deadline") as HTMLInputElement
        ).value;
        await post(title, description, deadline);
        router.push("/");
    }

    return (
        <>
            <div className="m-4" onSubmit={handleAddNewTodo}>
                <form>
                    <label htmlFor="title">Title</label>
                    <br />
                    <input
                        className="text-black"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title..."
                        required
                        autoComplete="off"
                    />
                    <br />
                    <br />
                    <label htmlFor="description">Description</label>
                    <br />
                    <input
                        className="text-black"
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Description..."
                        required
                        autoComplete="off"
                    />
                    <br />
                    <br />
                    <label htmlFor="deadline">Deadline</label>
                    <br />
                    <input
                        className="text-black"
                        type="date"
                        name="deadline"
                        id="deadline"
                        min={new Date().toISOString().substring(0, 10)}
                        defaultValue={new Date().toISOString().substring(0, 10)}
                        required
                    />
                    <br />
                    <br />
                    <button
                        type="submit"
                        className="bg-yellow-400 text-black hover:text-white mt-2 p-2 ml-14"
                    >
                        Add
                    </button>
                </form>
            </div>
        </>
    );
}
