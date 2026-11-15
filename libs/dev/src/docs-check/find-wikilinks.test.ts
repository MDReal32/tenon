import assert from "node:assert/strict";
import { test } from "node:test";
import { findWikilinks } from "./find-wikilinks.ts";

test("reads the target, the heading and drops the alias", () => {
  const [match] = findWikilinks("see [[page#Some heading|label]] here");
  assert.equal(match?.target, "page");
  assert.equal(match?.heading, "Some heading");
});

test("reads a plain wikilink", () => {
  const [match] = findWikilinks("[[page]]");
  assert.equal(match?.target, "page");
  assert.equal(match?.heading, undefined);
});
