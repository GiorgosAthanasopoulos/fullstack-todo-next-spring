function Toggle({ onclick, title }: any): JSX.Element {
    return (
        <>
            <div className="mx-4">
                <label htmlFor={title} className="mr-2">
                    {title}
                </label>
                <label className="switch">
                    <input
                        type="checkbox"
                        name={title}
                        id={title}
                        onChange={(e) => {
                            onclick(e);
                        }}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </>
    );
}

export default Toggle;
