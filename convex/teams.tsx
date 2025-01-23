import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTeams = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("createdBy"), args.email))
      .collect();
  },
});

export const createTeam = mutation({
  args: {
    teamName: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("teams", args);
  },
});

export const deleteTeam = mutation({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, args) => {
    // First get all files associated with this team
    const files = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("teamId"), args.teamId.toString()))
      .collect();

    // Delete all files first
    for (const file of files) {
      await ctx.db.delete(file._id);
    }

    // Then delete the team itself
    return await ctx.db.delete(args.teamId);
  },
});
