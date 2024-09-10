'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}

const ImageWithFallback = ({
  src,
  fallbackSrc,
  alt,
  style,
  className,
  height,
  width,
  fill,
}: ImageWithFallbackProps) => {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      alt={alt}
      src={imageSrc}
      onError={() => setImageSrc(fallbackSrc)}
      className={className}
      height={height}
      width={width}
      style={style}
      fill={fill}
    />
  );
};

export default ImageWithFallback;
