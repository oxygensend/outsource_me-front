export const Search = ({search, onChangeHandler, placeholder}) => {
    return (

        <input
            className={"search "}
            type="text"
            placeholder= { placeholder ?? "Szukaj..." }
            value={search}
            onChange={onChangeHandler}
        />
    );
}