// components/image-with-fallback.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  [key: string]: any;
}

export default function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      src={imgSrc || fallbackSrc}
      alt={alt}
      onError={handleError}
      // Pass props like 'fill', 'className', etc. directly to the Next.js Image component
      {...props}
    />
  );
}
