declare namespace Geo {
  export interface FeatureCollection {
    features: Feature[];
    type: "FeatureCollection";
  }

  export interface Feature {
    id: string;
    geometry: Geometry;
    properties: Properties;
    type: "Feature";
  }

  export interface Geometry {
    coordinates: number[];
    type: "Point";
  }

  export interface Properties {
    "LWD-Region": string;
    date?: string;
    GS_O?: number;
    GS_U?: number;
    HS?: number;
    HSD24?: number;
    HSD48?: number;
    HSD72?: number;
    LD?: number;
    LT_MAX?: number;
    LT_MIN?: number;
    LT?: number;
    name: string;
    OFT?: number;
    operator: string;
    plot: string;
    RH?: number;
    TD?: number;
    WG_BOE?: number;
    WG?: number;
    WR?: number;
  }
}
