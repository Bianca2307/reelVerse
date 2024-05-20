import PropTypes from "prop-types";
import styled from "styled-components";
import {
    BACKGROUND_COLORS,
    COLORS,
    HEIGHT_SIZES,
    PADDING_SIZES,
    ICON_POSITION,
    THEME_COLORS,
    SIZE_VALUE,
    BUTTON_TYPE,
} from "../../utils/theme";

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
        props.size === SIZE_VALUE.SM
            ? PADDING_SIZES.SM
            : props.size === SIZE_VALUE.MD
                ? PADDING_SIZES.MD
                : props.size === SIZE_VALUE.LG
                    ? PADDING_SIZES.LG
                    : PADDING_SIZES.DEFAULT};
    height: ${(props) =>
        props.size === SIZE_VALUE.SM
            ? HEIGHT_SIZES.SM
            : props.size === SIZE_VALUE.MD
                ? HEIGHT_SIZES.MD
                : props.size === SIZE_VALUE.LG
                    ? HEIGHT_SIZES.LG
                    : HEIGHT_SIZES.DEFAULT};
    background-color: ${(props) =>
        props.theme === THEME_COLORS.LIGHT
            ? BACKGROUND_COLORS.LIGHT_BACKGROUND
            : props.type === BUTTON_TYPE.ICON
                ? BACKGROUND_COLORS.TRANSPARENT_BACKGROUND
                : props.theme === THEME_COLORS.DARK
                    ? BACKGROUND_COLORS.DARK_BACKGROUND
                    : props.theme === THEME_COLORS.PRIMARY
                        ? BACKGROUND_COLORS.DARK_BACKGROUND
                        : props.theme === THEME_COLORS.WHITE
                            ? BACKGROUND_COLORS.WHITE
                            : props.theme === THEME_COLORS.BLUE
                                ? BACKGROUND_COLORS.BLUE_BACKGROUND
                                : props.theme === THEME_COLORS.DANGER
                                    ? BACKGROUND_COLORS.DANGER
                                    : BACKGROUND_COLORS.GRAY_BACKGROUND};
    color: ${(props) =>
        props.type === BUTTON_TYPE.ICON
            ? COLORS.LIGHT_GRAY
            : props.theme === THEME_COLORS.LIGHT
                ? COLORS.WHITE
                : props.theme === THEME_COLORS.BLUE
                    ? COLORS.WHITE
                    : props.theme === THEME_COLORS.DANGER
                        ? COLORS.WHITE
                        : COLORS.BLACK};
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
    iconPosition,
}) {
    return (
        <ButtonComponent
            type={type || BUTTON_TYPE.BUTTON}
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
            {type === BUTTON_TYPE.ICON && icon && <Icon>{icon}</Icon>}
            {type === BUTTON_TYPE.ICON_AND_TEXT && icon && children && (
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
            {type === BUTTON_TYPE.TEXT && children && <span>{children}</span>}
        </ButtonComponent>
    );
}

Button.propTypes = {
    type: PropTypes.oneOf(["button", "icon", "iconAndText", "text"]).isRequired,
    theme: PropTypes.oneOf([
        "light",
        "transparent",
        "dark",
        "primary",
        "white",
        "blue",
    ]),
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    className: PropTypes.string,
    id: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
    style: PropTypes.object,
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(["left", "right"]),
};
