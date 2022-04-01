import "styles/ui/GreenButton.scss";

export const GreenButton = props => (
    <button
        {...props}
        style={{width: props.width, ...props.style}}
        className={`primary-button ${props.className}`}>
        {props.children}
    </button>
);
