import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  
  savedQueries: defineTable({
    userId: v.id("users"),
    searchTerm: v.string(),
    filters: v.string(), // JSON string of filters
    provider: v.string(),
    name: v.string(),
  }).index("by_user", ["userId"]),
  
  settings: defineTable({
    userId: v.id("users"),
    autosaveQueries: v.boolean(),
    defaultSearchProviderId: v.optional(v.string()),
    queryPreview: v.boolean(),
  }).index("by_user", ["userId"]),
  
  searchProviders: defineTable({
    name: v.string(),
    url: v.string(),
  }),
});