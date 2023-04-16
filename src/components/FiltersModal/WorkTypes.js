import { FilterItem } from './FilterItem';
import { FilterSection } from './FilterSection';
import { isInArray } from '../../services/utils';
import { useState } from 'react';

export const WorkTypes = ({ workTypesList, onFilterClick, workTypes }) => {
    const [selectedWorkTypes] = useState(workTypes);

    const onClickWorkType = (workType) => {
        if (isInArray(workType.id, selectedWorkTypes)) {
            const index = selectedWorkTypes.indexOf(workType.id);
            selectedWorkTypes.splice(index, 1);
        } else {
            selectedWorkTypes.push(workType.id);
        }

        onFilterClick('workTypes', selectedWorkTypes);
    };

    return (
        <FilterSection subTitle={'Rodzaj pracy'}>
            <div className={'flex flex-row gap-2  mt-5 flex-wrap mb-12'}>
                {workTypesList
                    ? workTypesList.map((workType, i) => {
                          return (
                              <FilterItem
                                  key={i}
                                  name={workType.name}
                                  onClick={() => onClickWorkType(workType)}
                                  active={isInArray(workType.id, selectedWorkTypes)}
                              />
                          );
                      })
                    : null}
            </div>
        </FilterSection>
    );
};
