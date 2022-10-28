import { useEffect, useState } from "react";
//DATA
import VECTOR from '../../../data/vector.json';
//COMPONENTS
import SectionSelector from "./SectionSelector/SectionSelector";
import CurrentSelector from "./CurrentSelector/CurrentSelector";
import PoleSelector from "./PoleSelector/PoleSelector";
//STYLES
import { FiltersBoxTitle, RelatedFiltersBox } from "./FiltersBox.styled";

const TELERGON = VECTOR.telergon;

export default function FiltersBox({setElements}){
  const [sectionFilter, setSectionFilter] = useState('');
  const [sectionElements, setSectionElements] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('');
  const [currentElements, setCurrentElements] = useState([]);
  const [poleFilter, setPoleFilter] = useState('');
  const [poleElements, setPoleElements] = useState([]);

  useEffect(() => {
    const elementsArray =[];
    for (const key in TELERGON) {
      if(!elementsArray.includes(key))
      elementsArray.push(key);
    };
    setSectionElements(elementsArray);
  }, [])

  useEffect(() => {
    const array = []
    for (const key in TELERGON[sectionFilter]) {
      if(!array.includes(TELERGON[sectionFilter][key].current))
      array.push(TELERGON[sectionFilter][key].current);
    };
    setCurrentElements(array)
  }, [sectionFilter])

  useEffect(() => {
    const array = []
    for (const key in TELERGON[sectionFilter]) {
      if(!array.includes(TELERGON[sectionFilter][key].pole))
      array.push(TELERGON[sectionFilter][key].pole);
    };
    setPoleElements(array);
  }, [sectionFilter])

  useEffect(() => {
    const array = []
    for (const key in TELERGON[sectionFilter]) {
      if( currentFilter === '' && poleFilter === ''){
        array.push(TELERGON[sectionFilter][key]);
      }
      if(currentFilter !== '' && poleFilter === ''){
        if(Number(currentFilter) === TELERGON[sectionFilter][key].current) array.push(TELERGON[sectionFilter][key]);
      }
      if(currentFilter === '' && poleFilter !== ''){
        if(Number(poleFilter) === TELERGON[sectionFilter][key].pole) array.push(TELERGON[sectionFilter][key]);
      }
      if(currentFilter !== '' && poleFilter !== ''){
        if(Number(poleFilter) === TELERGON[sectionFilter][key].pole
            &&
          Number(currentFilter) === TELERGON[sectionFilter][key].current
        ) array.push(TELERGON[sectionFilter][key]);
      }
    };
    setElements(array);
  }, [sectionFilter,currentFilter, poleFilter,setElements])

  return(
    <>
      <FiltersBoxTitle>Пошук по фільтрам</FiltersBoxTitle>
      <SectionSelector
        sectionElements={sectionElements}
        setSectionFilter={setSectionFilter}
      />
      <RelatedFiltersBox>
        <CurrentSelector
          currentElements={currentElements}
          setCurrentFilter={setCurrentFilter}
        />
        <PoleSelector
          poleElements={poleElements}
          setPoleFilter={setPoleFilter}
        />
      </RelatedFiltersBox>
    </>
  )

}