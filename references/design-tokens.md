# Tokens de Motion Design e Princípios de Animação

Diretrizes estéticas para garantir consistência em todos os vídeos do estúdio.

---

## 1. Princípios de Física Spring

| Preset | Damping | Mass | Stiffness | Overshoot Clamping | Sensação Visual |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`snappy`** | 24 | 0.8 | 220 | false | Ágil, moderno, sem atraso perceptível. Padrão para cartões e títulos. |
| **`bouncy`** | 12 | 1.0 | 180 | false | Elástico e divertido. Ideal para badges, ícones e stickers. |
| **`smooth`** | 30 | 1.2 | 120 | false | Elegante, refinado e sem solavancos. Padrão para transições de tela. |
| **`cinematic`**| 40 | 2.0 | 90 | false | Pesado e dramático com cauda longa de desaceleração. |
| **`stiff`** | 30 | 0.5 | 300 | true | Rápido e mecânico sem nenhum rebote (overshoot zero). |

---

## 2. Ritmo Visual & Timing

- **Entrada de Título Principal**: 15 a 25 frames.
- **Stagger entre Palavras**: 2 a 4 frames por palavra.
- **Transição de Cena**: 12 a 18 frames.
- **Permanência para Leitura**: Mínimo de 1 segundo (30 frames) para cada 4 palavras.
- **Saída de Elementos**: 8 a 15 frames (geralmente mais rápida que a entrada).

---

## 3. Cores & Iluminação no Dark Mode

- **Background Principal**: `bg-neutral-950` (`#0a0a0a`) ou `bg-black`.
- **Cartões e Superfícies**: `bg-neutral-900/80` com bordas sutis `border-neutral-800`.
- **Glow Ambiente**: Círculos radiais com `blur-[120px]` e opacidade moderada (15% a 25%).
- **Cores de Destaque Primárias**:
  - Blue Neon: `#2563eb` ou `#3b82f6`
  - Violet/Purple: `#7c3aed` ou `#8b5cf6`
  - Emerald Green: `#10b981`
  - Amber Gold: `#f59e0b`
