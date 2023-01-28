import "./MyScreen.css";

const Screen = ({ value }) => {
    return (
        <textarea className="textArea" value={value}></textarea>
    );
};

export default Screen;