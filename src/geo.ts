import type {
  FeatureSchema,
  FeatureCollectionSchema,
} from "@albina-euregio/linea/src/schema/listing-legacy";
import type z from "zod";

export type Feature = z.input<typeof FeatureSchema>;
export type FeatureCollection = z.input<typeof FeatureCollectionSchema>;
