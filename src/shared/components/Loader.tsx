import { useState, useEffect } from 'react';

const Loader = () => {
  const [loaderText, setLoaderText] = useState<string>('Загрузка...');
  const loaderStepTimer = 1000;

  const loaderTextAnimation = async () => {
    const loaderTextDots: string = '...';

    for (let i = 0; i < loaderTextDots.length; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setLoaderText((prevLoaderText) => {
            return (prevLoaderText = prevLoaderText + loaderTextDots[i]);
          });

          resolve('done');
        }, loaderStepTimer);
      });
    }
  };

  useEffect(() => {
    if (loaderText.endsWith('...')) {
      setTimeout(() => {
        setLoaderText('Загрузка');

        loaderTextAnimation();
      }, loaderStepTimer);
    }
  }, [loaderText]);

  return (
    <div className="w-full m-auto flex items-center justify-center gap-2">
      <div className="w-5 h-5 border-4 border-t-transparent border-blue-300 rounded-full animate-spin"></div>
      <h1 className="w-22 font-semibold">{loaderText}</h1>
    </div>
  );
};

export default Loader;
