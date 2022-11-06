export const FilterSection = ({children, subTitle, className}) => {
    return (
        <div className={"filter-section filter-header "}>
            <p className={"font-medium text-xl"}>{subTitle}</p>
            <div className={"mt-3 "  + (className ?? '')}>
                {children}
            </div>
        </div>
    );
}