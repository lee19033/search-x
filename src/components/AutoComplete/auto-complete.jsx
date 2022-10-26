import React, { useState, useMemo, useRef } from "react";
import useAutoFocus from "../../hooks/useAutoFocus";
import useOutsideClick from "../../hooks/useOutsideClick";
import ResultList from "../results-list/result-list";
import './auto-complete.css';
import localDB from '../../localDB.js'
import searchIcon from '../../images/icons8-search-24.png';
import historyIcon from '../../images/icons8-clock-24.png';
import removeIcon from '../../images/211652_close_icon.png';

const AutoComplete = (props) => {

    const ref = useRef();

    useOutsideClick(ref, () => {
        handleBlur()
      });


    const searchInput = useAutoFocus();
    

    const items = props.data; 

    const [state, setState] = useState({
        activeItem: 0, 
        filterdItems: [], 
        displayItems: false, 
        inputValue: '',
        showResult: false,
    })
    
    const handleChange = (e) => {
        const inputValue = e.currentTarget.value; 
        const filterdItems = items.filter((row) => {
            return row.key.toLowerCase().startsWith(inputValue.toLowerCase())
        })
    
        setState({
            activeItem: 0,
            filterdItems, 
            displayItems: true, 
            inputValue: e.currentTarget.value,
            showResult: false
        });

    }

    const handleClick = (e, text) => {
        console.log('click')
        e.stopPropagation()   
        setState({
            activeItem: 0, 
            filterdItems: [],
            displayItems: false,
            inputValue: text,
            showResult: true,
        })

    }

    const handleKeyDown = (e) => {
        const { inputValue } = state; 
        
        if (e.keyCode === 13) {
            setState({
                activeItem: 0,
                filterdItems: [],
                displayItems: false, 
                inputValue,
                showResult: true,
            })
            localStorage.setItem(inputValue.toLowerCase(), inputValue)
        };

    }

    const handleBlur = () => {
        const { activeItem, filterdItems, inputValue } = state; 
        
        setState({
            activeItem: activeItem,
            filterdItems: filterdItems,
            displayItems: false, 
            inputValue: inputValue,
            showResult: false
        })
    }

    const handleFocus = (e) => {
        e.stopPropagation()   
        console.log('focus')

        const { activeItem, filterdItems, inputValue } = state; 
        
        setState({
            activeItem: activeItem,
            filterdItems: filterdItems,
            displayItems: true, 
            inputValue: inputValue,
            showResult: false
        })
        

    }

    const inLocalStorage = (text) => {
         return localStorage.getItem(text) ? true : false;
    }

    const removeHistoryItem = (e,text) => {

        const { activeItem, filterdItems, inputValue } = state;
        console.log(filterdItems.length)

        e.stopPropagation()        
        console.log('remove');                
        localStorage.removeItem(text);

        setState({
            activeItem: activeItem,
            filterdItems: filterdItems,
            displayItems: true, 
            inputValue: inputValue,
            showResult: false
        })

    }

    const searchResult = useMemo(() => {
        if (!state.inputValue) return []

        return localDB.filter((row) => {
            return (row.key.toLowerCase() === state.inputValue.toLowerCase())
        })

    })

    

    return(
        <>
         <div ref={ref}>
                <input 
                        id="searchText"
                        type="search" 
                        ref={searchInput}
                        placeholder="Search..."                         
                        value={state.inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}                    
                        onFocus={handleFocus}           
                        autoComplete="off"
                    />
                    {state.displayItems  && state.filterdItems && state.inputValue.length >0 && 
                        <div className="complete"> 
                       
                           { state.filterdItems.map((text, index) => {
                             return (
                                    
                                        <div key={index.toString()}  className="complete__row" onClick={(e) => handleClick(e, text.key)}>
                                        <div className="complete__img">
                                        <img key={`img${index}`} 
                                            src={inLocalStorage(text.key) ? historyIcon : searchIcon} 
                                            width="13px" 
                                            height="13px" 
                                            />
                                        </div>                            

                                        <div  key={`row${index}`}                             
                                            className={inLocalStorage(text.key) ? 'complete__row_history_color_purple' : 'complete__row_color_black'}>
                                                {text.key}
                                        </div>
                           
                                        { inLocalStorage(text.key) && 
                                                <div className="complete__img_align">
                                                    
                                                    <img src={removeIcon} 
                                                        width="10px" 
                                                        height="10px" 
                                                        className="complete__row_align_right"
                                                        onClick={ (e) =>  removeHistoryItem(e, text.key)}
                                                        />                                                                      
                                                </div>
                                        }                                                      
                               
                            
                                        </div>
                                
                             )   
                           }).slice(0,10) 
                        }
                        
                        
                        </div>

                    } 

                    {state.showResult && 
                        <ResultList list={searchResult}></ResultList>
                    }
                

                </div>
        </>
    )

}

export default AutoComplete