#!/usr/bin/env node
"use strict";

const migrateUrl =
  "https://patch.codemagic.io/docs/migration/migrating-from-codepush";

console.warn(
  [
    "",
    "[DEPRECATED] @code-push-next/react-native-code-push is deprecated in favor of",
    "Codemagic Patch (@codemagic/react-native-patch), which includes a web dashboard,",
    "native fingerprinting and support for new React Native versions.",
    migrateUrl,
    "",
  ].join("\n")
);
