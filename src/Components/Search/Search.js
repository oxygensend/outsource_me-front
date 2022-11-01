export const Search = ({search, onChangeHandler, placeholder, error}) => {
    return (
        <div>
            <input
                className={"search "}
                type="text"
                placeholder={placeholder ?? "Szukaj..."}
                value={search}
                onChange={onChangeHandler}
            />

            {error ?
                <span
                    className={"font-medium tracking-wide ml-1 text-red-500 text-xs relative bottom-1 "}>
                   {error.message ?? error}
                </span> : null
            }
        </div>
    );
}