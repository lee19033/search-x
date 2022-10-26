import React from 'react'; 
import SearchResults from '../results/search-result';
import './result-list.css'

const ResultList = (props) => {

    return (
    <>

        <div className='search__container'>
        <hr/>
        <small>About {props.list.length} results ({parseFloat(Math.random().toFixed(5))} seconds)</small>
        {props.list.map((row, index) => {
            return (
                <SearchResults key={index}
                               title={row.title} 
                               link={row.link} 
                               description={row.description}></SearchResults>
            )
            
        })}
        </div>
        
    </>)
}

export default ResultList