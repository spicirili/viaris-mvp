// src/adapters/map-provider.ts
//
// Porta de abstração de mapas (ver seção 10 do documento de arquitetura):
// "jamais depender exclusivamente de um fornecedor".
//
// No MVP, a visualização usa uma projeção "radar" própria (ver
// components/RadarMap.tsx) em vez de tiles de um provedor externo — evita
// dependência de chave de API só para provar a hipótese do produto, e reforça
// a identidade de "copiloto" em vez de "mapa genérico". Trocar por
// Mapbox/Google Maps no futuro é uma troca de implementação, não uma
// reescrita: as coordenadas já vêm normalizadas (lat/lng, SRID 4326) do domínio.

export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface MapProvider {
  geocode(endereco: string): Promise<Coordenadas>;
}

// Implementação de MVP: cidades pré-geocodificadas manualmente (curadoria),
// suficiente para validar a hipótese numa única cidade de lançamento
// (ver seção 15 do documento de arquitetura — "uma única cidade no lançamento").
const CIDADES_CONHECIDAS: Record<string, Coordenadas> = {
  florianopolis: { lat: -27.5954, lng: -48.548 },
};

class StaticMapProvider implements MapProvider {
  async geocode(endereco: string): Promise<Coordenadas> {
    const chave = endereco.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return CIDADES_CONHECIDAS[chave] ?? CIDADES_CONHECIDAS["florianopolis"];
  }
}

export const mapProvider: MapProvider = new StaticMapProvider();
