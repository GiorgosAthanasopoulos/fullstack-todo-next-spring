"use client";

import { deleteAll, getAll } from "@/api/todo";
import Todo from "@/components/Todo";
import Toggle from "@/components/Toggle";
import { T_Todo } from "@/interfaces/todo";
import { useEffect, useState } from "react";
import "../styles/toggle.css";
import EnhancedDate from "@/interfaces/Date";

function clearToggle(id: string) {
    const el = document.getElementById(id) as HTMLInputElement;
    el.checked = false;
}

function getPreviousSunday(): Date {
    const date: Date = new Date();
    const previousMonday: Date = new Date();

    previousMonday.setDate(date.getDate() - date.getDay());

    return previousMonday;
}

function nextDate(dayIndex: number): Date {
    var today: Date = new Date();

    today.setDate(
        today.getDate() + ((dayIndex - 1 - today.getDay() + 7) % 7) + 1
    );

    return today;
}

export default function Home(): JSX.Element {
    const [todos, setTodos] = useState([] as T_Todo[]);
    const [filter, setFilter] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    useEffect(() => {
        async function getData() {
            const data: T_Todo[] = [];
            const _data: T_Todo[] = await getAll();
            _data.forEach((__data) => {
                if (filter) {
                    if (__data.completed != completed) {
                        return;
                    }
                    if (
                        !__data.title
                            .toLowerCase()
                            .includes(title.toLowerCase()) &&
                        title !== ""
                    ) {
                        return;
                    }
                    if (
                        !__data.description
                            .toLocaleLowerCase()
                            .includes(description.toLowerCase()) &&
                        title !== ""
                    ) {
                        return;
                    }
                    const cmpDate: Date = new Date(__data.deadline);

                    switch (deadline) {
                        case "today":
                            if (
                                cmpDate.toDateString() !==
                                new Date().toDateString()
                            ) {
                                return;
                            }
                            break;
                        case "tomorrow":
                            if (
                                cmpDate.toDateString() !==
                                EnhancedDate.addDays(
                                    new Date(),
                                    1
                                ).toDateString()
                            ) {
                                return;
                            }
                            break;
                        case "week":
                            if (
                                !(
                                    getPreviousSunday().getTime() <=
                                        cmpDate.getTime() &&
                                    cmpDate.getTime() < nextDate(0).getTime()
                                )
                            ) {
                                return;
                            }
                            break;
                        case "month":
                            if (
                                cmpDate.getMonth() !== new Date().getMonth() ||
                                cmpDate.getFullYear() !==
                                    new Date().getFullYear()
                            ) {
                                return;
                            }
                            break;
                        case "year":
                            if (
                                cmpDate.getFullYear() !==
                                new Date().getFullYear()
                            ) {
                                return;
                            }
                            break;
                        case "eternity":
                            break;
                    }
                }
                data.push(__data);
            });
            setTodos(data);
        }
        getData();
    }, [todos, filter, completed, title, description, deadline]);

    return (
        <>
            <div className="my-6 flex flex-wrap flex-row p-3 bg-yellow-400 text-black text-xl clear-both">
                <Toggle
                    title="filter"
                    onclick={function onclick(e: InputEvent) {
                        if (e.target) {
                            setFilter((e.target as HTMLInputElement).checked);
                        }
                    }}
                />
                {filter ? (
                    <>
                        <Toggle
                            title="completed"
                            onclick={function onclick(e: InputEvent) {
                                if (e.target) {
                                    setCompleted(
                                        (e.target as HTMLInputElement).checked
                                    );
                                }
                            }}
                        />
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="filter by title"
                            className="mr-1 w-50 h-10"
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            name="description"
                            id="description"
                            placeholder="filter by description"
                            className="w-50 h-10"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                        <button
                            className="text-black mx-4 hover:text-white"
                            onClick={() => {
                                setCompleted(false);
                                clearToggle("completed");
                                setTitle("");
                                (
                                    document.getElementById(
                                        "title"
                                    ) as HTMLInputElement
                                ).value = "";
                                setDescription("");
                                (
                                    document.getElementById(
                                        "description"
                                    ) as HTMLInputElement
                                ).value = "";
                                setDeadline("");
                                (
                                    document.getElementById(
                                        "deadline-select"
                                    ) as HTMLSelectElement
                                ).selectedIndex = 5;
                            }}
                        >
                            Clear filters
                        </button>
                        <br className="basis-full h-0" />
                        <label className="mt-4 ml-96" htmlFor="deadline-select">
                            Deadline
                        </label>
                        <select
                            id="deadline-select"
                            name="deadline-select"
                            title="deadline-select"
                            className="ml-4 mt-4"
                            onChange={(e) => {
                                setDeadline(e.target.value);
                            }}
                            defaultValue={"eternity"}
                        >
                            <option value="today">Today</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="week">This week</option>
                            <option value="month">This month</option>
                            <option value="year">This year</option>
                            <option value="eternity">Eternity</option>
                        </select>
                    </>
                ) : (
                    <></>
                )}
            </div>
            <div className="my-4">
                <div className="grid grid-cols-4">
                    {todos.map((todo: T_Todo) => {
                        return <Todo key={todos.indexOf(todo)} todo={todo} />;
                    })}
                </div>
                <button
                    onClick={async () => {
                        await deleteAll();
                    }}
                    className="bg-yellow-400 text-black hover:text-white p-2 mr-4 float-right mb-4"
                >
                    Delete all
                </button>
            </div>
        </>
    );
}
