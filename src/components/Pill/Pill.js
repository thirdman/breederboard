import React from "react";
import classNames from "classnames";
import { Box, Text } from "grommet";
import { FormClose, CheckboxSelected, Checkbox } from "grommet-icons";
import "./Pill.scss";

function Pill(props) {
  const {
    displayMode = "default",
    hasClose = false,
    text,
    isToggle = false,
    isActive,
    onClick = () => {},
    onClickRemove = () => {}
  } = props;
  // const [showContent, setShowContent] = useState(false);

  return (
    <Box
      className={classNames(
        "Pill",
        displayMode,
        hasClose ? "hasClose" : "",
        isToggle ? "isToggle" : "",
        isActive ? "isActive" : "isInactive"
      )}
      round="medium"
      // background="secondary"
      key={`attributePill-${text}`}
      pad="none"
      // gap="xxsmall"
      direction="row"
      animation="slideUp"
      align="center"
      justify="center"
      onClick={onClick}
    >
      {isToggle && (
        <Box className="checkBoxButton">
          {isActive ? (
            <CheckboxSelected color="#fff" />
          ) : (
            <Checkbox color="#fff" />
          )}
        </Box>
      )}
      <Box pad="xsmall" className="pillText">
        <Text size="small" color="#fff">
          {text}
        </Text>
      </Box>
      {hasClose && (
        <Box
          pad="xsmall"
          onClick={() => {
            onClickRemove(text);
          }}
          className="closeButton"
        >
          <FormClose color="#fff" />
        </Box>
      )}
    </Box>
  );
}

export default Pill;
