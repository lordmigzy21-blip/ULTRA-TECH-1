'use client';

import React from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
  src: string;
  className?: string;
  loop?: boolean;
}

export default function LottieAnimation({ src, className = '', loop = true }: LottieAnimationProps) {
  const [data, setData] = React.useState<object | null>(null);

  React.useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, [src]);

  if (!data) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <Lottie animationData={data} loop={loop} className={className} />;
}
