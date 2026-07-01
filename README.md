# Viaris — MVP Navegável

Protótipo front-end do Viaris (copiloto comercial), construído com Next.js 14, React, TypeScript e Tailwind CSS. Todos os dados são simulados — não há backend, banco de dados ou integração real de IA. O objetivo é validar experiência, fluxo e proposta de valor do produto.

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

O login é simulado — qualquer e-mail/senha (ou o botão "Continuar com Google") entra no app. Todo o estado do usuário (perfil, favoritos, rota, observações) fica salvo no `localStorage` do navegador. Para reiniciar a demonstração do zero, use "Reiniciar demonstração" em Configurações, ou limpe o localStorage do site.

## Telas incluídas

1. **Login** (`/login`) — autenticação simulada
2. **Onboarding** (`/onboarding`) — cadastro do perfil comercial em 4 passos
3. **Dashboard** (`/dashboard`) — visão geral do dia, destaque do Copiloto, estatísticas, top oportunidades
4. **Mapa de Oportunidades** (`/mapa`) — visualização radar + lista + filtros laterais
5. **Dossiê Empresarial** (`/empresa/[id]`) — resumo, Score, Janela de Oportunidade, Índice de Confiança, justificativa, contato, observações, favoritar, adicionar à rota
6. **Favoritos** (`/favoritos`)
7. **Minha Rota** (`/rota`) — roteiro reordenável das visitas do dia
8. **Configurações** (`/configuracoes`) — editar perfil, sair, reiniciar demo

O **Copiloto** (botão flutuante no canto inferior direito) simula mensagens proativas em qualquer tela autenticada.

## Organização do código (pensada para integração futura com backend)

```
src/
├── domain/          # Tipos e regras de negócio puras — Empresa, Score, Janela
│   ├── types.ts
│   └── scoring.ts    # Motor de score determinístico e auditável
├── adapters/         # Camada de abstração de fornecedores externos
│   ├── ai-provider.ts    # Hoje gera justificativa localmente; troca futura por API real da Claude é isolada aqui
│   └── map-provider.ts   # Hoje geocodifica de forma estática; troca futura por Mapbox/Google Maps é isolada aqui
├── data/             # Dados mockados (simulam a saída do pipeline de ingestão)
│   ├── seed-companies.ts
│   └── copiloto-mensagens.ts
├── lib/
│   ├── storage.ts         # Toda persistência do usuário passa por aqui (hoje localStorage, futuramente API)
│   └── useOportunidades.ts
├── components/       # Componentes de UI reutilizáveis
└── app/              # Rotas (App Router do Next.js) — uma pasta por tela
```

Nenhuma tela acessa `localStorage`, dados mockados ou provedores externos diretamente — tudo passa pelas camadas acima. Trocar qualquer uma dessas peças por uma implementação real (autenticação de verdade, banco de dados, IA generativa, mapa real) não deve exigir tocar em nenhuma tela.

## Próximos passos sugeridos

- Conectar `lib/storage.ts` a uma API real (Identity/Engagement services do documento de arquitetura).
- Conectar `adapters/map-provider.ts` a um provedor de geocoding real.
- Conectar `adapters/ai-provider.ts` à API da Claude para gerar justificativas dinâmicas a partir do Motor de Sinais real.
