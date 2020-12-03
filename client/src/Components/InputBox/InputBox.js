import './InputBox.scss'

const inputBox = (props) => {
    return(
        <input type="text" placeholder={props.children} onChange={props.inputValue} className="input"/>
    );
}
export default inputBox ;