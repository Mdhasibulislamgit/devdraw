import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

export const getUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    return result;
  },
});

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      throw new ConvexError({
        code: "CONFLICT",
        message: "User with this email already exists. Please login instead."
      });
    }

    // Create new user if they don't exist
    const userId = await ctx.db.insert("user", {
      name: args.name,
      email: args.email,
      image: args.image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return {
      userId,
      message: "User created successfully"
    };
  },
});

// Additional helper query to check if user exists
export const checkUserExists = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    return {
      exists: !!user,
      user: user || null
    };
  },
});
