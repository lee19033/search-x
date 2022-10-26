import React from "react";
import AutoComplete from "../AutoComplete/auto-complete";
import './search-x.css';
import localDB from '../../localDB.js'

const SearchX = () => {

    return (
        <>
            <div className="center-screen">
                <div>
                    <p>Search-X</p>
                </div>                    
                    <AutoComplete data={localDB}> </AutoComplete>                                               
            </div>
       
        </>
    )
}

export default SearchX