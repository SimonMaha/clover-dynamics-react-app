import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export const Dropdown = ({items, title, showNext}) => {
  
    const handleChange = event => {
        event.preventDefault();
        showNext(event ,event.target.value);
        
    }
    
    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <FormControl className="drop-list">
                        <InputLabel htmlFor="age-native-simple">{`Choose ${title}`}</InputLabel>
                        <Select
                            className="drop-list"
                            native
                            onChange={handleChange}
                            inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            {items.map(item => (
                                <option className="form-control" value={item.name} key={item.id}>{item.name}</option>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
        // <form className="container-fluid" onSubmit={handleSubmit}>
        //     <div className="row">
        //         <div className="col text-center">
        //             <label>
        //                 Choose {title}:
        //             </label>
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-lg-4 col-md-2"></div>
        //         <div className="col-lg-4 col-md-8 col-sm-8 text-right" style={{marginBottom: 20}}>
        //             <select value={value} onChange={handleChange} className="drop-list form-control">
        //                 {items.map(item => (
        //                     <option className="form-control " value={item.name} key={item.id}>{item.name}</option>
        //                 ))}
        //             </select>
        //         </div>
        //         <div className="col-lg-1 col-md-2 col-sm-4 text-center">
        //             <button className="btn btn-outline-primary" type="submit" id="button-addon2">Submit</button>
        //         </div>
        //         <div className="col-lg-3"></div>
        //     </div>
        // </form>
    );
    
  }
