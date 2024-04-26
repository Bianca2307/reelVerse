import PropTypes from "prop-types";
import styled from "styled-components";
import { BACKGROUND_COLORS, COLORS, HEIGHT_SIZES, PADDING_SIZES, ICON_POSITION, THEME_COLORS, SIZE_VALUE, BUTTON_TYPE } from "../../utils/theme";

const ButtonComponent = styled.button`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    border: none;
    border-radius: 15px;
    font-family: Inter, sans-serif;
    font-weight: 500;
    padding: 0
        ${(props) =>
        props.size === SIZE_VALUE.sm
            ? PADDING_SIZES.sm
            : props.size === SIZE_VALUE.md
                ? PADDING_SIZES.md
                : props.size === SIZE_VALUE.lg
                    ? PADDING_SIZES.lg
                    : PADDING_SIZES.default};
    height: ${(props) =>
        props.size === SIZE_VALUE.sm
            ? HEIGHT_SIZES.sm
            : props.size === SIZE_VALUE.md
                ? HEIGHT_SIZES.md
                : props.size === SIZE_VALUE.lg
                    ? HEIGHT_SIZES.lg
                    : HEIGHT_SIZES.default};
    background-color: ${(props) =>
        props.theme === THEME_COLORS["light"]
            ? BACKGROUND_COLORS.lightBackground
            : props.theme === THEME_COLORS["transparent"]
                ? BACKGROUND_COLORS.transparentBackground
                : props.theme === THEME_COLORS["dark"]
                    ? BACKGROUND_COLORS.darkBackground
                    : props.theme === THEME_COLORS["primary"]
                        ? BACKGROUND_COLORS.darkBackground
                        : BACKGROUND_COLORS.grayBackground};
    color: ${(props) =>
        props.theme === THEME_COLORS["transparent"]
            ? COLORS.lightGray
            : props.theme === THEME_COLORS["light"]
                ? COLORS.white
                : COLORS.black};
`;
const Icon = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Button({
    type,
    theme,
    size,
    className,
    id,
    onClick,
    children,
    style,
    icon,
    iconPosition
}) {
    return (
        <ButtonComponent
            type={type || BUTTON_TYPE.button}
            theme={theme}
            className={
                className ? `btn-component ${className}` : "btn-component"
            }
            onClick={onClick}
            id={id}
            size={size}
            style={style}
            icon={icon}
            iconPosition={iconPosition}
        >
            {type === BUTTON_TYPE.icon && icon && <Icon>{icon}</Icon>}
            {type === BUTTON_TYPE.iconAndText && icon && children && (
                <>
                    {icon && iconPosition === ICON_POSITION.LEFT && (
                        <Icon>{icon}</Icon>
                    )}
                    {children && <span>{children}</span>}
                    {icon && iconPosition === ICON_POSITION.RIGHT && (
                        <Icon>{icon}</Icon>
                    )}
                </>
            )}
            {type === BUTTON_TYPE.text && children && <span>{children}</span>}
        </ButtonComponent>
    );
}

Button.propTypes = {
    type: PropTypes.oneOf(["button","icon","iconAndText","text"]),
    theme: PropTypes.oneOf(["light", "transparent", "dark", "primary"]),
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    className: PropTypes.string,
    id: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(["left", "right"]),
};