/**
 * Content blocks are stored as JSON, but admins should never have to type JSON.
 * These helpers derive an editing shape from the block's own value and convert
 * between that JSON and the plain-text conventions already used elsewhere in the
 * admin: one item per line, and `a | b | c` for the columns of a row.
 */

export type ObjectField =
  | { key: string; kind: "text" }
  | { key: string; kind: "lines" }
  | { key: string; kind: "rows"; fields: string[] };

export type BlockShape =
  | { kind: "lines" }
  | { kind: "rows"; fields: string[] }
  | { kind: "object"; fields: ObjectField[] }
  | { kind: "json" };

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === "string");

const isRowArray = (v: unknown): v is Record<string, unknown>[] =>
  Array.isArray(v) && v.length > 0 && v.every((x) => isPlainObject(x) && Object.values(x).every((y) => typeof y === "string" || isStringArray(y)));

/** Infers how a block should be edited from its current value. */
export function shapeOf(value: unknown): BlockShape {
  if (isStringArray(value)) return { kind: "lines" };
  if (isRowArray(value)) return { kind: "rows", fields: Object.keys(value[0]) };

  if (isPlainObject(value)) {
    const fields: ObjectField[] = [];
    for (const [key, v] of Object.entries(value)) {
      if (typeof v === "string") fields.push({ key, kind: "text" });
      else if (isStringArray(v)) fields.push({ key, kind: "lines" });
      else if (isRowArray(v)) fields.push({ key, kind: "rows", fields: Object.keys(v[0]) });
      else return { kind: "json" };
    }
    return { kind: "object", fields };
  }

  return { kind: "json" };
}

const rowsToText = (rows: Record<string, unknown>[], fields: string[]) =>
  rows
    .map((row) => fields.map((f) => (isStringArray(row[f]) ? (row[f] as string[]).join(" ; ") : String(row[f] ?? ""))).join(" | "))
    .join("\n");

const textToRows = (raw: string, fields: string[], sample?: Record<string, unknown>) =>
  raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((p) => p.trim());
      const row: Record<string, unknown> = {};
      fields.forEach((f, i) => {
        const cell = parts[i] ?? "";
        // A field that held a list in the original keeps holding a list.
        row[f] = sample && isStringArray(sample[f]) ? cell.split(";").map((x) => x.trim()).filter(Boolean) : cell;
      });
      return row;
    });

/** JSON → the text that goes into each form control. */
export function serializeBlock(shape: BlockShape, value: unknown): Record<string, string> {
  switch (shape.kind) {
    case "lines":
      return { __value: (value as string[]).join("\n") };
    case "rows":
      return { __value: rowsToText(value as Record<string, unknown>[], shape.fields) };
    case "object": {
      const obj = value as Record<string, unknown>;
      const out: Record<string, string> = {};
      for (const field of shape.fields) {
        if (field.kind === "text") out[field.key] = String(obj[field.key] ?? "");
        else if (field.kind === "lines") out[field.key] = ((obj[field.key] as string[]) ?? []).join("\n");
        else out[field.key] = rowsToText((obj[field.key] as Record<string, unknown>[]) ?? [], field.fields);
      }
      return out;
    }
    default:
      return { __value: JSON.stringify(value, null, 2) };
  }
}

/** Form values → the JSON written back to `content_blocks.data`. */
export function parseBlock(shape: BlockShape, form: Record<string, string>, sample: unknown): unknown {
  switch (shape.kind) {
    case "lines":
      return (form.__value ?? "")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
    case "rows":
      return textToRows(form.__value ?? "", shape.fields, (sample as Record<string, unknown>[])?.[0]);
    case "object": {
      const sampleObj = (sample ?? {}) as Record<string, unknown>;
      const out: Record<string, unknown> = {};
      for (const field of shape.fields) {
        const raw = form[field.key] ?? "";
        if (field.kind === "text") out[field.key] = raw.trim();
        else if (field.kind === "lines") out[field.key] = raw.split("\n").map((l) => l.trim()).filter(Boolean);
        else out[field.key] = textToRows(raw, field.fields, (sampleObj[field.key] as Record<string, unknown>[])?.[0]);
      }
      return out;
    }
    default:
      return JSON.parse(form.__value ?? "null");
  }
}

/** "cta_primary_label" → "Cta primary label" */
export const humanise = (key: string) => key.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());
