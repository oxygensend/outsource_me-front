import { FilterItem } from './FilterItem';
import { isInArray } from '../../services/utils';

export const TechnologiesBox = ({
    results,
    technologiesList,
    onClickTechnology,
    selectedTechnologies,
    filterProperty,
}) => {
    return (
        <div className={'flex flex-row gap-2  mt-5 flex-wrap mb-12 overflow-y-scroll'} style={{ maxHeight: '10.5rem' }}>
            {results
                ? results.map((technology, i) => {
                      return (
                          <FilterItem
                              key={i}
                              name={technology.name}
                              onClick={() => onClickTechnology(technology)}
                              active={isInArray(technology.name, selectedTechnologies)}
                          />
                      );
                  })
                : technologiesList
                ? technologiesList.map((technology, i) => {
                      return (
                          <FilterItem
                              key={i}
                              name={technology.name}
                              onClick={() => onClickTechnology(technology)}
                              active={isInArray(technology.name, selectedTechnologies)}
                          />
                      );
                  })
                : null}
        </div>
    );
};
