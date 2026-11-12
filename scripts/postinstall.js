#!/usr/bin/env node
"use strict";

const migrateUrl =
  "https://patch.codemagic.io/docs/migration/migrating-from-codepush";

console.warn(
  [
    "",
    "[DEPRECATED] @code-push-next/react-native-code-push. Use",
    "Codemagic Patch (@codemagic/react-native-patch) instead. This package is frozen:",
    "no new features, no React Native version support.",
    migrateUrl,
    "",
  ].join("\n")
);
