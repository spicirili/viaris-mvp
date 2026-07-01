// src/adapters/ai-provider.ts
//
// Porta de abstração de IA (ver seção 11 do documento de arquitetura).
// O domínio nunca importa um SDK de IA diretamente — sempre passa por aqui.
// Isso permite trocar de provedor (Claude, outro modelo, ou motor de regras
// puro) sem tocar em nenhuma tela ou no motor de score.
//
// IMPORTANTE: este adapter NÃO decide o score. Ele só traduz um score já
// calculado (domain/scoring.ts) em uma frase que um vendedor entende em 3 segundos.

import type { Oportunidade } from "@/domain/types";

export interface AIProvider {
  gerarJustificativa(oportunidade: Oportunidade): Promise<string>;
}

// Implementação padrão do MVP: monta a justificativa localmente a partir dos
// fatores do score, sem chamada de rede — determinístico, gratuito e sempre
// disponível. Trocar por uma chamada real à API da Claude é uma troca de
// implementação desta classe, não uma mudança na tela ou no motor de score.
class RuleBasedAIProvider implements AIProvider {
  async gerarJustificativa(oportunidade: Oportunidade): Promise<string> {
    const fatoresPositivos = oportunidade.fatores
      .filter((f) => f.peso > 0)
      .sort((a, b) => b.peso - a.peso);

    if (fatoresPositivos.length === 0) {
      return "Poucos fatores favoráveis identificados até o momento — vale reavaliar antes de investir tempo aqui.";
    }

    const principal = fatoresPositivos[0];
    const resto = fatoresPositivos.slice(1, 3).map((f) => f.explicacao);

    let texto = principal.explicacao;
    if (resto.length > 0) {
      texto += " Além disso: " + resto.join(" ");
    }
    return texto;
  }
}

// Stub pronto para a troca por uma chamada real (documentado, não ativo no MVP):
//
// class ClaudeAIProvider implements AIProvider {
//   async gerarJustificativa(oportunidade: Oportunidade): Promise<string> {
//     const res = await fetch("https://api.anthropic.com/v1/messages", { ... });
//     ...
//   }
// }

export const aiProvider: AIProvider = new RuleBasedAIProvider();
