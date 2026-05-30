'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

interface Props extends Omit<ImageProps, 'onError'> {
  fallbackText?: string;
}

export default function ProductImage({ fallbackText = 'MF', src, alt, ...rest }: Props) {
  const [errored, setErrored] = useState(false);
  const fallbackSrc = `https://placehold.co/600x600/FAF7F2/1E3A8A?text=${encodeURIComponent(fallbackText)}`;

  return (
    <Image
      {...rest}
      src={errored ? fallbackSrc : src}
      alt={alt}
      onError={() => setErrored(true)}
    />
  );
}
