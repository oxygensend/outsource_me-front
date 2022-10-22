export const ListElement = (props) => {
    return (
        <div className={"flex flex-row gap-8 mt-5"}>
            <div className={"list-vector relative top-5"}></div>
            <div style={{width:"100%"}}>
                <p>{props.name}</p>
                {props.timePeriod ?
                    <p className={"gray-font3 italic"}>{props.timePeriod}</p>
                    : null}
                {props.children}
                <p className={"gray-font3 italic pt-1 "} style={{color: "#000"}}>{props.metaData}</p>
            </div>
        </div>
    );
}