import { loadFont as loadInterFont } from '@remotion/google-fonts/Inter';
import { loadFont as loadLocalRemotionFont } from '@remotion/fonts';
import { staticFile } from 'remotion';

/**
 * Carrega a fonte Inter via Google Fonts oficial do Remotion.
 * Garante que a renderização aguarde o carregamento completo dos glifos.
 */
export const loadStudioFontInter = () => {
  return loadInterFont();
};

export interface LocalFontOptions {
  family: string;
  urlPath: string; // Ex: "shared/fonts/MinhaFonte.woff2"
  weight?: string;
  style?: string;
}

/**
 * Carrega uma fonte local estática localizada em public/
 */
export const loadLocalFont = ({
  family,
  urlPath,
  weight = 'normal',
  style = 'normal',
}: LocalFontOptions) => {
  return loadLocalRemotionFont({
    family,
    url: staticFile(urlPath),
    weight,
    style,
  });
};
