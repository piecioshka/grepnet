import { config } from '../config';

export const GrepService = {
  async grep(url, phrase) {
    const response = await fetch(`${config.API}?url=${url}`, {
      method: 'post',
      body: new URLSearchParams({ url, phrase }),
    });
    return await response.json();
  },
};
