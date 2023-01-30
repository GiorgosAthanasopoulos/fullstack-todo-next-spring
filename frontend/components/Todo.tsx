import { T_Todo } from "@/interfaces/todo";
import { _delete, putCompleted } from "@/api/todo";
import Link from "next/link";
import DateView from "./DateView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export type TodoProps = {
    todo: T_Todo;
    xonclick?: Function;
    showDate?: boolean;
};

function Todo(props: TodoProps) {
    const todo = props.todo;
    const xonclick = props.xonclick;
    const showDate = props.showDate;
    const router = useRouter();

    return (
        <>
            <div
                className="m-4 p-4 text-black text-xl bg-yellow-400 w-fit"
                key={todo.title}
            >
                <span className="flex flex-row justify-between">
                    <Link
                        href={"/" + todo.id}
                        className="text-2xl underline text-center"
                    >
                        {todo.title}
                        {showDate && ", Id: " + todo.id}
                    </Link>
                    {showDate && (
                        <button
                            className="ml-3 text-bold text-2xl"
                            onClick={() => {
                                router.push("edit/" + todo.id);
                            }}
                        >
                            <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                        </button>
                    )}
                    <button
                        className="ml-1 text-bold text-2xl"
                        onClick={
                            xonclick
                                ? (e) => {
                                      xonclick(e);
                                  }
                                : async () => {
                                      await _delete(todo.id);
                                  }
                        }
                    >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                </span>
                <h2>{todo.description}</h2>
                <hr className="my-2 border-2 border-solid border-black" />
                <label className="mr-2" htmlFor="completed">
                    Completed
                </label>
                <input
                    type="checkbox"
                    title="completed"
                    defaultChecked={todo.completed}
                    onChange={async (e) => {
                        await putCompleted(todo.id, e.target.checked);
                    }}
                />
                <br />
                <label htmlFor="deadline">Deadline</label>
                <br />
                <DateView date={todo.deadline} />
                {showDate && (
                    <>
                        <div>
                            <label htmlFor="created">Created</label>
                            <br />
                            <DateView date={todo.createdAt} />
                            <label htmlFor="updated">Updated</label>
                            <br />
                            <DateView date={todo.updatedAt} />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Todo;
