import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // next/image routes through /_vinext/image, which calls env.ASSETS in
      // worker/index.ts. The built wrangler config declares assets without a
      // `binding` name and declares no IMAGES binding, so env.ASSETS is
      // undefined and the endpoint 500s in dev and in the build. Using
      // <Image> would break every image on the site. Sources are WebP and
      // below-the-fold images are lazy; revisit if those bindings are added.
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
