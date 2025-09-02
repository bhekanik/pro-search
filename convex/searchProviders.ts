import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listSearchProviders = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("searchProviders"),
      _creationTime: v.number(),
      name: v.string(),
      url: v.string(),
    })
  ),
  handler: async (ctx, args) => {
    const providers = await ctx.db
      .query("searchProviders")
      .collect();
    
    return providers;
  },
});

export const seedSearchProviders = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx, args) => {
    const existingProviders = await ctx.db
      .query("searchProviders")
      .collect();
    
    if (existingProviders.length === 0) {
      const providers = [
        { name: "Google", url: "https://www.google.com/search" },
        { name: "DuckDuckGo", url: "https://duckduckgo.com/" },
        { name: "Bing", url: "https://www.bing.com/search" },
        { name: "Yahoo", url: "https://search.yahoo.com/search" },
      ];
      
      for (const provider of providers) {
        await ctx.db.insert("searchProviders", provider);
      }
    }
    
    return null;
  },
});