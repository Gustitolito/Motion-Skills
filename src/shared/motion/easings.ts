import { Easing } from 'remotion';

/**
 * Curvas de Easing profissionais para uso com interpolate()
 */
export const EASINGS = {
  // Aceleração e desaceleração padrão suave (estilo Apple / iOS)
  standard: Easing.bezier(0.25, 0.1, 0.25, 1.0),

  // Saída acelerada e parada rápida e elegante
  outExpo: Easing.out(Easing.exp),

  // Entrada e saída dramática para transições de tela cheia
  inOutCubic: Easing.inOut(Easing.cubic),

  // Desaceleração suave clássica
  outCubic: Easing.out(Easing.cubic),

  // Curva de entrada para elementos saindo da tela
  inCubic: Easing.in(Easing.cubic),

  // Efeito punchy para títulos e kinetic typography
  punchy: Easing.bezier(0.16, 1, 0.3, 1),
};
