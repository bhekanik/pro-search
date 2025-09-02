import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const getUserSettings = query({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("settings"),
      _creationTime: v.number(),
      userId: v.id("users"),
      autosaveQueries: v.boolean(),
      defaultSearchProviderId: v.optional(v.string()),
      queryPreview: v.boolean(),
    })
  ),
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }
    
    const settings = await ctx.db
      .query("settings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    
    return settings;
  },
});

export const updateSettings = mutation({
  args: {
    autosaveQueries: v.optional(v.boolean()),
    defaultSearchProviderId: v.optional(v.string()),
    queryPreview: v.optional(v.boolean()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("User must be authenticated");
    }
    
    const existingSettings = await ctx.db
      .query("settings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    
    if (existingSettings) {
      const updates: any = {};
      if (args.autosaveQueries !== undefined) updates.autosaveQueries = args.autosaveQueries;
      if (args.defaultSearchProviderId !== undefined) updates.defaultSearchProviderId = args.defaultSearchProviderId;
      if (args.queryPreview !== undefined) updates.queryPreview = args.queryPreview;
      
      await ctx.db.patch(existingSettings._id, updates);
    } else {
      await ctx.db.insert("settings", {
        userId,
        autosaveQueries: args.autosaveQueries ?? true,
        defaultSearchProviderId: args.defaultSearchProviderId,
        queryPreview: args.queryPreview ?? true,
      });
    }
    
    return null;
  },
});