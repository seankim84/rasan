import { describe, expect, it } from "vitest";
import { messages } from "@/lib/i18n/messages";

function flattenKeys(value: object, prefix = ""): string[] {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof child === "object" ? flattenKeys(child as object, path) : [path];
  });
}

describe("translations", () => {
  it("keeps vi, ko, and en key sets identical", () => {
    const baseline = flattenKeys(messages.vi).sort();
    expect(flattenKeys(messages.ko).sort()).toEqual(baseline);
    expect(flattenKeys(messages.en).sort()).toEqual(baseline);
  });

  it("does not ship empty values", () => {
    Object.values(messages).forEach((localeMessages) => {
      expect(JSON.stringify(localeMessages)).not.toContain('""');
    });
  });
});
