// utils/truncateText.js
export const truncateText = (text, limit, isWordLimit = true) => {
  if (!text) return '';

  if (isWordLimit) {
      const words = text.split(' ');
      if (words.length <= limit) return text;

      return words.slice(0, limit).join(' ') + '...';
  } else {
      if (text.length <= limit) return text;

      return text.substring(0, limit) + '...';
  }
};
