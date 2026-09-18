---
name: studio-qa-art-direction
description: "QA visual e direção de arte final contra motion genérico e inconsistências. Use when: uma implementação está pronta para revisão de hierarquia, ritmo, material, efeitos e acabamento. NOT for: briefing inicial, roteamento de skills ou implementação cotidiana."
---

# Studio QA & Art Direction

## Objetivo
Última camada antes do render final. Avalia qualidade visual, coerência de movimento e acabamento.

## Checklist
- Existe um herói claro por beat?
- Tipografia, cor e motion contam a mesma história?
- Há variedade de timing sem ruído?
- Há momentos de repouso?
- As transições preservam eyetrace?
- O material parece consistente com o comportamento?
- Blur/glow/grain são acabamento, não camuflagem?
- A peça ainda funciona sem efeitos decorativos?

## Testes obrigatórios
1. Assista sem áudio.
2. Assista em 0.5x e 2x para revelar problemas de spacing.
3. Inspecione frames-chave estáticos.
4. Veja em tamanho pequeno para testar hierarquia.
5. Remova temporariamente partículas/glow: a composição ainda é forte?

## Sinais de motion “AI/template”
- mesmos springs em tudo;
- bounce e glow excessivos;
- elementos surgindo sem causa;
- transições diferentes a cada cena;
- excesso de gradients neon;
- texto animado caractere a caractere sem semântica;
- partículas como preenchimento de vazio.

## Done
Cada efeito é justificável, o ritmo tem intenção e a peça parece dirigida como um sistema, não montada por presets aleatórios.
