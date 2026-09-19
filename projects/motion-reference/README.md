# Template de Projeto

Este é o molde padrão clonado automaticamente pelo script:

```bash
npm run new-project <slug-do-projeto>
```

## Estrutura

- `project.config.ts`: Manifesto tipado com status, resolução padrão, tags e assets.
- `index.tsx`: Registro das composições com carregamento lazy (`lazyComponent`).
- `compositions/`: Composições raiz para cada formato (9:16, 16:9, etc.).
- `scenes/`: Cenas sequenciais isoladas para cada ato do vídeo.
- `components/`: Elementos visuais exclusivos do projeto.
- `data/`: Textos, roteiros, constantes ou dados mockados.
