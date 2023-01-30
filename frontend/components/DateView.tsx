export type DateProps = {
    date: Date;
};

function DateView({ date }: DateProps) {
    return (
        <>
            <div>
                <input
                    type="date"
                    title="deadline"
                    value={date.toString()}
                    className="mt-2 bg-yellow-400 text-black border-2 border-solid border-black"
                    readOnly={true}
                />
            </div>
        </>
    );
}

export default DateView;
