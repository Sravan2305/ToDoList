import './Button.scss'

const SubmitButton = (props) => {
    return(
        <button onClick ={props.clicked} className="submit">{props.children}</button>
    );
}
export default SubmitButton ;