import React, { useState } from 'react';

export const Dropdown = ({items, title, showNext}) => {
    const [value, setValue] = useState(items[0].name);
  
    const handleChange = event => {
        setValue(event.target.value);
        
    }
    
    const handleSubmit = event => {
        event.preventDefault();
        console.log('Your choice ' + value);
        showNext(event ,value);
    }
    
    return (
        <form className="container-fluid" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col text-center">
                    <label>
                        Choose {title}:
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-2"></div>
                <div className="col-lg-4 col-md-8 col-sm-8 text-right" style={{marginBottom: 20}}>
                    <select value={value} onChange={handleChange} className="drop-list form-control">
                        {items.map(item => (
                            <option className="form-control " value={item.name} key={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-lg-1 col-md-2 col-sm-4 text-center">
                    <button className="btn btn-outline-primary" type="submit" id="button-addon2">Submit</button>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </form>
    );
    
  }
