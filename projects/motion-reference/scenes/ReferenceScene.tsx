import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { STYLE_PROFILES, framesAtFps } from "@shared/motion/style-profiles";
import { KineticText } from "@shared/typography/KineticText";

export const ReferenceScene: React.FC<{
  kind: keyof typeof STYLE_PROFILES;
}> = ({ kind }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const profile = STYLE_PROFILES[kind];
  const p = interpolate(frame, [0, framesAtFps(profile.reveal, fps)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(
      profile.easing[0],
      profile.easing[1],
      profile.easing[2],
      profile.easing[3],
    ),
  });
  const outro = interpolate(
    frame,
    [framesAtFps(210, fps), framesAtFps(239, fps)],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const ink = kind === "editorial" || kind === "data" ? "#142b37" : "#f3eee3";
  const accent = kind === "promo" ? "#deff49" : "#c4a66b";
  return (
    <AbsoluteFill
      style={{
        backgroundColor:
          kind === "editorial" || kind === "data" ? "#f4f1e9" : "#111918",
        color: ink,
        fontFamily: "Arial, sans-serif",
        padding: 100,
      }}
    >
      <div style={{ opacity: outro, height: "100%", position: "relative" }}>
        <div style={{ fontSize: 22, letterSpacing: 5, opacity: 0.65 }}>
          MOTION STUDIES / {kind.toUpperCase()}
        </div>
        {kind === "premium" && (
          <>
            <div
              style={{
                position: "absolute",
                right: 180,
                top: 120,
                width: 360,
                height: 530,
                borderRadius: 60,
                background: "linear-gradient(135deg,#ddd2b6,#5e655c)",
                transform: `translateY(${(1 - p) * profile.travel}px) scale(${0.98 + 0.02 * p})`,
                opacity: p,
                boxShadow: "40px 40px 100px #0008",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 240,
                left: 0,
                maxWidth: 850,
                transform: `translateY(${(1 - p) * profile.travel}px)`,
                opacity: p,
              }}
            >
              <div style={{ fontSize: 110, lineHeight: 1.05 }}>
                Precisão.
                <br />
                Em cada detalhe.
              </div>
              <p style={{ fontSize: 30, marginTop: 48, color: accent }}>
                Tempo para perceber o essencial.
              </p>
            </div>
          </>
        )}
        {kind === "promo" && (
          <>
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 130,
                width: 520,
                height: 520,
                borderRadius: "50%",
                background: accent,
                transform: `scale(${0.8 + 0.2 * p})`,
                opacity: p,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 200,
                maxWidth: 1200,
                fontSize: 132,
                fontWeight: 900,
                lineHeight: 1.04,
              }}
            >
              <KineticText
                text="O próximo passo é seu."
                stagger={framesAtFps(2, fps)}
                emphasis={[1]}
                emphasisAnimation="bounce-pop"
                emphasisStyle={{ color: accent, backgroundColor: "#111918" }}
                emphasisHold={framesAtFps(8, fps)}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 80,
                fontSize: 38,
                opacity: frame > framesAtFps(60, fps) ? 1 : 0,
              }}
            >
              COMECE HOJE →
            </div>
          </>
        )}
        {kind === "editorial" && (
          <>
            <div
              style={{
                position: "absolute",
                top: 190,
                left: 0,
                width: 6,
                height: 260 * p,
                background: "#466b6c",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 190,
                left: 50,
                fontSize: 100,
                opacity: p,
                transform: `translateX(${(1 - p) * profile.travel}px)`,
              }}
            >
              Memória que
              <br />
              atravessa gerações.
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 80,
                padding: "25px 40px",
                borderTop: "2px solid #142b37",
                width: "100%",
                opacity: frame > framesAtFps(50, fps) ? 1 : 0,
              }}
            >
              <div style={{ fontSize: 34 }}>Histórias da cidade</div>
              <div style={{ fontSize: 24, marginTop: 12 }}>
                Referência editorial • entrevista e documentação
              </div>
            </div>
          </>
        )}
        {kind === "data" && (
          <>
            <h1 style={{ fontSize: 72, marginTop: 70 }}>Cada etapa conta.</h1>
            <div style={{ fontSize: 24 }}>
              Dados ilustrativos • mesma escala, base zero
            </div>
            {[35, 60, 85].map((value, i) => {
              const progress = interpolate(
                frame,
                [framesAtFps(35 + i * 6, fps), framesAtFps(65 + i * 6, fps)],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(
                    profile.easing[0],
                    profile.easing[1],
                    profile.easing[2],
                    profile.easing[3],
                  ),
                },
              );
              return (
                <div
                  key={value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 28,
                    marginTop: 38,
                    fontSize: 30,
                  }}
                >
                  <span style={{ width: 140 }}>Etapa {i + 1}</span>
                  <div
                    style={{
                      width: (value / 100) * (width - 500) * progress,
                      height: 64,
                      background: "#466b6c",
                    }}
                  />
                  <span>{Math.round(value * progress)}</span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </AbsoluteFill>
  );
};
