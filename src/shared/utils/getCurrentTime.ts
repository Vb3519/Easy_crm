function getCurrentTime(): string {
  const currentData: Date = new Date();
  const hours: string = currentData.getHours().toString().padStart(2, '0');
  const minutes: string = currentData.getMinutes().toString().padStart(2, '0');

  const currentTime: string = `${hours}:${minutes}`;
  return currentTime;
}

export default getCurrentTime;
