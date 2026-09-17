# Especificações de Resolução e Aspect Ratios

Tabela de referência para composições no estúdio.

---

## 1. Formatos Padrão

| Formato | Resolução | Aspect Ratio | FPS Recomendado | Plataforma Principal |
| :--- | :--- | :--- | :--- | :--- |
| **Vertical Full** | 1080 × 1920 | 9:16 | 30 ou 60 | Instagram Reels, TikTok, YouTube Shorts, Stories |
| **Horizontal Full** | 1920 × 1080 | 16:9 | 30 ou 60 | YouTube, Desktop, TV, LinkedIn Vídeos |
| **Square Post** | 1080 × 1080 | 1:1 | 30 | Feed Instagram, Twitter/X, Facebook |
| **Portrait Feed** | 1080 × 1350 | 4:5 | 30 | Feed Instagram Vertical Otimizado |
| **Ultra HD 4K** | 3840 × 2160 | 16:9 | 30 ou 60 | Master High-End, TV Displays |

---

## 2. Safe Zones em Reels / TikTok (9:16)

Ao animar textos, títulos e botões em vídeos verticais de 1080x1920, posicione elementos essenciais fora das zonas de interface:

- **Topo (15% = 288px)**: Zona de avatar, nome de usuário e barra de status do celular.
- **Base (22% = 422px)**: Zona de legenda do post, áudio, comentários e barra de navegação do app.
- **Lateral Direita (12% = 130px)**: Botões de like, comentários, compartilhamento e remix.
- **Área Útil Segura**: Centro da tela com margem interna de 80px nas laterais.

> Use `<SafeZone type="reels-9-16" show={true} />` para visualizar esses limites diretamente no preview.
