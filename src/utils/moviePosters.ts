export const getMoviePoster = (title: string, customPoster?: string): string => {
  if (customPoster && customPoster.trim().length > 0) {
    return customPoster;
  }
  const normalized = (title || '').toLowerCase();
  if (normalized.includes('avatar')) {
    return 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg';
  }
  if (normalized.includes('inception')) {
    return 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg';
  }
  if (normalized.includes('deadpool') || normalized.includes('wolverine')) {
    return 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg';
  }
  return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop';
};

export const getMovieBackdrop = (title: string, customBackdrop?: string): string => {
  if (customBackdrop && customBackdrop.trim().length > 0) {
    return customBackdrop;
  }
  const normalized = (title || '').toLowerCase();
  if (normalized.includes('avatar')) {
    return 'https://image.tmdb.org/t/p/w1280/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg';
  }
  if (normalized.includes('inception')) {
    return 'https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg';
  }
  if (normalized.includes('deadpool') || normalized.includes('wolverine')) {
    return 'https://image.tmdb.org/t/p/w1280/yDHYTjA3R0ne8NDj4tISAcvNzbp.jpg';
  }
  return 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1280&auto=format&fit=crop';
};
