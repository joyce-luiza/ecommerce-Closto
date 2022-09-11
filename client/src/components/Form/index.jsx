import '../styles/formStyle.css';

function Form({title, children}) {
    return(
        <div className="form">
            <span className='form-title'>
                {title}
            </span>

            <div className="form-children">
                {children}
            </div>
        </div>
    )
}

export default Form;