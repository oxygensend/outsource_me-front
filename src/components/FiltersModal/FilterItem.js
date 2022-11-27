export const FilterItem = ({name, onClick, active}) => {
    return (
        <div className={"align-middle cursor-pointer " + (active ? 'choosen-filter-item' : 'filter-item')}
             onClick={onClick}
        >
            <p>{name}</p>
        </div>
    )
}