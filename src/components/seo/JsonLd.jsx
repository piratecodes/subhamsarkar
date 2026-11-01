function cleanValue(val) {
  if (val === undefined) return undefined;
  if (val === null || typeof val !== "object") return val;
  if (Array.isArray(val)) {
    return val
      .map(cleanValue)
      .filter((item) => item !== undefined);
  }
  const result = {};
  for (const [key, value] of Object.entries(val)) {
    const cleaned = cleanValue(value);
    if (cleaned !== undefined) {
      result[key] = cleaned;
    }
  }
  return result;
}

export default function JsonLd({ data, schema }) {
  const payload = data || schema;
  if (!payload) return null;

  const cleaned = cleanValue(payload);
  if (!cleaned) return null;

  const jsonString = JSON.stringify(cleaned).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
