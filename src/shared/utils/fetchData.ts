// Имитация задержки ответа от сервера:
export const serverDelayImitation = async (
  delayTimer: number
): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('done');
    }, delayTimer);
  });
};

// Загрузка данных:
export const fetchData = async (url: string) => {
  try {
    const response: Response = await fetch(url);
    if (response.ok) {
      const data: unknown = await response.json();
      return data;
    } else {
      console.log(`HTTP Error: ${response.status} ${response.statusText}`);
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
  } catch (error: unknown) {
    console.log(`Error: ${(error as Error).message}`);
    throw new Error(`Error: ${(error as Error).message}`);
  }
};
