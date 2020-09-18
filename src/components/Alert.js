import React from 'react'

export const Alert = ({text, showAlert}) => {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 col-md-1"></div>
                <div className="col-lg-6 col-md-10 col-sm-12">
                    <div className="alert alert-danger alert-dismissible" role="alert">
                        <strong>Sorry!</strong>
                        &nbsp;{text}
                        <button onClick={() => showAlert(false)} type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div className="col-lg-3 col-md-1"></div>
            </div>
        </div>
    )
}