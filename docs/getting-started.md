# Guia de Início Rápido (Getting Started)

Aprenda a visualizar composições, criar novos projetos e renderizar vídeos no estúdio.

---

## 1. Abrir o Remotion Studio (Preview em Tempo Real)

```bash
npm run dev
```
O navegador abrirá automaticamente em `http://localhost:3000`. No painel lateral:
- Os projetos aparecem organizados por pastas (`Folder`).
- Clique na composição desejada para reproduzir, pausar, inspecionar frame a frame e alterar propriedades interativas.

---

## 2. Criar um Novo Projeto

```bash
npm run new-project nome-do-video
```
Esse comando:
- Cria `projects/nome-do-video/` a partir do template.
- Cria `public/projects/nome-do-video/` para assets.
- Registra o projeto automaticamente.
- Executa a verificação de tipos.

---

## 3. Renderizar Vídeos

```bash
# Render rápido de validação
npm run render -- --composition=demo-showcase-reel --preset=preview

# Render final para redes sociais (Reels/TikTok/Shorts)
npm run render -- --composition=demo-showcase-reel --preset=socialH264
```
Os arquivos gerados são salvos organizadamente na pasta `out/`:
- `out/previews/`
- `out/renders/`
- `out/stills/`

---

## 4. Testes de Integridade (Smoke Test)

Antes de realizar commits ou finalizar sessões de trabalho:
```bash
npm run test:smoke
```
Valida linting, compilação de tipos TypeScript e executa renderizações reais de teste.
