import { describe, expect, it } from "vitest";
import { isAllowedFont, isSafeColor, isSafeLink, isSafeMediaUrl } from "../src/lib/safe";
import { sanitizeConfig } from "../src/lib/render";

describe("reglas de seguridad de contenido", () => {
  it.each([
    ["", true],
    ["#contacto", true],
    ["https://example.com/a?b=1", true],
    ["http://example.com", true],
    ["mailto:hola@example.com", true],
    ["tel:+34 600 000 000", true],
    ["javascript:alert(1)", false],
    [" javascript:alert(1)", false],
    ["JAVASCRIPT:alert(1)", false],
    ["vbscript:msgbox", false],
    ["data:text/html,hola", false],
    ["https://example.com/\"onmouseover=\"x", false],
    ["#a b", false],
  ])("isSafeLink(%j) = %s", (value, expected) => {
    expect(isSafeLink(value)).toBe(expected);
  });

  it("las imágenes solo admiten http(s)", () => {
    expect(isSafeMediaUrl("https://example.com/a.png")).toBe(true);
    expect(isSafeMediaUrl("#ancla")).toBe(false);
    expect(isSafeMediaUrl("mailto:a@b.c")).toBe(false);
  });

  it("colores y fuentes", () => {
    expect(isSafeColor("#a1B2c3")).toBe(true);
    expect(isSafeColor("red")).toBe(false);
    expect(isSafeColor("#fff")).toBe(false);
    expect(isAllowedFont("Poppins")).toBe(true);
    expect(isAllowedFont("Arial;}")).toBe(false);
  });

  it("sanitizeConfig sustituye valores peligrosos por otros seguros", () => {
    const config = sanitizeConfig({
      theme: { colorPrimary: "red;}", colorSecondary: "#000000", fontFamily: "x", darkMode: 1 },
      hero: { ctaLink: "javascript:alert(1)", backgroundImage: "javascript:x" },
      video: { url: "javascript:x" },
      footer: { links: [{ label: "ok", url: "https://ok.example" }] },
    }) as Record<string, any>;

    expect(config.theme).toEqual({
      colorPrimary: "#3b82f6",
      colorSecondary: "#000000",
      fontFamily: "Inter",
      fontBody: "Inter",
      darkMode: true,
      language: "es",
    });
    expect(config.hero.ctaLink).toBe("#");
    expect(config.hero.backgroundImage).toBe("");
    expect(config.video.url).toBe("");
    expect(config.footer.links[0].url).toBe("https://ok.example");
  });
});
