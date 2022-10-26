import React from 'react'; 
import './search-result.css';

const SearchResult = (props) => {

    
    return (
        <>
            <div className='container'>
                <div className='container__title'>
                    <h3>
                     <a href={props.link} target="_blank" rel="noreferrer">
                        {props.title}
                    </a>
                    </h3>
                </div>
                <div className='container container__description'>
                     {props.description}
                </div>
            </div>
        </>
    )
}

export default SearchResult