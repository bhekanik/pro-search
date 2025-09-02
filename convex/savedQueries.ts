import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { auth } from './auth';

export const listSavedQueries = query({
	args: {},
	returns: v.array(
		v.object({
			_id: v.id('savedQueries'),
			_creationTime: v.number(),
			userId: v.id('users'),
			searchTerm: v.string(),
			filters: v.string(),
			provider: v.string(),
			name: v.string()
		})
	),
	handler: async (ctx, args) => {
		const userId = await auth.getUserId(ctx);
		if (!userId) {
			return [];
		}

		const queries = await ctx.db
			.query('savedQueries')
			.withIndex('by_user', (q) => q.eq('userId', userId))
			.order('desc')
			.collect();

		return queries;
	}
});

export const createSavedQuery = mutation({
	args: {
		searchTerm: v.string(),
		filters: v.string(),
		provider: v.string(),
		name: v.string()
	},
	returns: v.id('savedQueries'),
	handler: async (ctx, args) => {
		const userId = await auth.getUserId(ctx);
		if (!userId) {
			throw new Error('User must be authenticated to save queries');
		}

		return await ctx.db.insert('savedQueries', {
			userId,
			searchTerm: args.searchTerm,
			filters: args.filters,
			provider: args.provider,
			name: args.name
		});
	}
});

export const deleteSavedQuery = mutation({
	args: {
		queryId: v.id('savedQueries')
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const userId = await auth.getUserId(ctx);
		if (!userId) {
			throw new Error('User must be authenticated');
		}

		const query = await ctx.db.get(args.queryId);
		if (!query || query.userId !== userId) {
			throw new Error('Query not found or unauthorized');
		}

		await ctx.db.delete(args.queryId);
		return null;
	}
});

export const updateSavedQuery = mutation({
	args: {
		queryId: v.id('savedQueries'),
		name: v.optional(v.string()),
		searchTerm: v.optional(v.string()),
		filters: v.optional(v.string()),
		provider: v.optional(v.string())
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const userId = await auth.getUserId(ctx);
		if (!userId) {
			throw new Error('User must be authenticated');
		}

		const query = await ctx.db.get(args.queryId);
		if (!query || query.userId !== userId) {
			throw new Error('Query not found or unauthorized');
		}

		const updates: any = {};
		if (args.name !== undefined) updates.name = args.name;
		if (args.searchTerm !== undefined) updates.searchTerm = args.searchTerm;
		if (args.filters !== undefined) updates.filters = args.filters;
		if (args.provider !== undefined) updates.provider = args.provider;

		await ctx.db.patch(args.queryId, updates);
		return null;
	}
});
