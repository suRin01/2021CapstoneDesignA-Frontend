import React from "react";
import styled from "styled-components";

const Container = styled.i`
  display: inline-block;
  background-image: url(./icon/icon.svg);
  width: 22px;
  height: 22px;
  background-position: ${({ shape }) => iconTable[shape]};
  background-repeat: no-repeat;
  background-size: 60px 200px;
`;

const iconTable = {
  heart: "-9px 0px",
  fillHeart: "-29px 0px",
  comment: "-9px -19px",
  fillComment: "-29px -18px",
  trash: "-9px -39px",
  fillTrash: "-29px -39px",
  export: "-9px -59px",
  fillExport: "-29px -59px",
  postWrite: "-9px -79px",
  imageAppend: "-9px -99px",
};

const Icon = ({ shape }) => {
  return <Container shape={shape} />;
};

export default Icon;
