const isProduction = process.env.NODE_ENV === 'production';

export const BASE_URL = isProduction ? 'https://heartbible.app/' : 'http://localhost:3000/';
export const OG_IMAGE_URL = `${BASE_URL}images/og_image.png`;
export const KLUTCHE_BASE_URL = isProduction ? 'https://heartbible.klutche.com/' : 'http://localhost:8080/';