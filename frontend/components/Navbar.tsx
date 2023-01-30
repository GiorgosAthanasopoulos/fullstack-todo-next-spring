import Link from "next/link";

function Navbar(): JSX.Element {
    return (
        <>
            <div className="flex flex-row justify-between p-3 bg-yellow-400 text-black ">
                <div className="flex flex-row">
                    <h1 className="text-3xl select-none ">Do me!</h1>
                    <Link
                        href="/"
                        className="ml-4 mt-2 text-xl underline hover:text-white"
                    >
                        Home
                    </Link>
                    <Link
                        href="/add"
                        className="ml-4 mt-2 text-xl underline hover:text-white"
                    >
                        Add new
                    </Link>
                    <Link
                        href="/trash"
                        className="ml-4 mt-2 text-xl underline hover:text-white"
                    >
                        Trash
                    </Link>
                </div>
                <div className="text-xl underline">
                    <Link
                        className="mr-4 hover:text-white"
                        target="_blank"
                        href="https://www.github.com/giorgosathanasopoulos/fullstack-todo-next-spring"
                    >
                        Source
                    </Link>
                    <Link
                        className="hover:text-white"
                        target="_blank"
                        href="https://www.github.com/giorgosathanasopoulos/"
                    >
                        Author
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Navbar;
