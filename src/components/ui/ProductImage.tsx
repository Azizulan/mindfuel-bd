'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

interface Props extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallbackText?: string;
}

export default function ProductImage({ fallbackText = 'MF', src, alt, className, ...rest }: Props) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const fallbackSrc = `https://placehold.co/600x600/FAF7F2/1E3A8A?text=${encodeURIComponent(fallbackText)}`;

  return (
    <>
      {!loaded && !errored && (
        <div
          className="skeleton absolute inset-0"
          aria-hidden="true"
        />
      )}
      <Image
        {...rest}
        src={errored ? fallbackSrc : src}
        alt={alt}
        className={`${className ?? ''} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onError={() => { setErrored(true); setLoaded(true); }}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
