import React, { useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Image as AntdImage } from "antd";

const ImageContainerStyle = styled.li`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(45%, auto));
  grid-auto-rows: auto;
  grid-gap: 3px;

  & > div {
    cursor: pointer;
  }
  & .ant-image-mask {
    opacity: 1;
  }
  & > .ant-image:nth-child(n + 5) {
    display: none;
  }
`;

const PostCardImages = ({ Images }) => {
  const getPreview = useCallback(index => {
    if (index === 3) return { mask: <b>이미지 {Images.length - 4}개 더보기</b> };

    return { mask: "" };
  }, []);

  // console.log(typeof Images);
  return (
    <ImageContainerStyle>
      <AntdImage.PreviewGroup>
        {Images.map((image, index) => (
          <AntdImage key={image._id} src={image.path} alt="임시" preview={getPreview(index)} />
        ))}
      </AntdImage.PreviewGroup>
    </ImageContainerStyle>
  );
};

PostCardImages.propTypes = {
  Images: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default PostCardImages;
