import Link from "next/link";

function Footer(): JSX.Element {
    return (
        <>
            <div className="my-4 flex flex-row justify-center p-3 bg-yellow-400 text-black text-xl clear-both mt-4">
                <h1>
                    GiorgosAthanasopoulos@
                    <Link
                        href="https://www.github.com/"
                        target="_blank"
                        className="underline hover:text-white"
                    >
                        Github.com
                    </Link>
                </h1>
            </div>
        </>
    );
}

export default Footer;
