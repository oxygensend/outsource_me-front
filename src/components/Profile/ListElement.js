export const ListElement = ({ disableVector, name, timePeriod, metaData, children }) => {
    return (
        <div className={'flex flex-row gap-8 mt-5'}>
            {disableVector ? null : <div className={'list-vector relative top-5'}></div>}
            <div style={{ width: '100%' }}>
                <p>{name}</p>
                {timePeriod ? <p className={'gray-font3 italic'}>{timePeriod}</p> : null}
                {children}
                <p className={'gray-font3 italic pt-1 '} style={{ color: '#000' }}>
                    {metaData}
                </p>
            </div>
        </div>
    );
};
