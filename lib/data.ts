// /data の JSON はここからだけ読む
import vegetablesJson from "@/data/vegetables.json";
import storesJson from "@/data/stores.json";
import postsJson from "@/data/posts.json";
import recipesJson from "@/data/recipes.json";
import listingsJson from "@/data/listings.json";
import projectsJson from "@/data/projects.json";
import liveJson from "@/data/live.json";
import userJson from "@/data/user.json";
import type {
  ChefShop, Listing, Live, Post, Project, Recipe, Store, User, Vegetable,
} from "./types";

export const vegetables = vegetablesJson as Vegetable[];
export const stores = storesJson as Store[];
export const posts = postsJson as Post[];
export const recipes = recipesJson as Recipe[];
export const listings = listingsJson.items as Listing[];
export const chefShops = listingsJson.chefShops as ChefShop[];
export const projects = projectsJson as Project[];
export const live = liveJson as Live;
export const user = userJson as User;

export const getVegetable = (id: string) => vegetables.find((v) => v.id === id);
export const getStoresFor = (veg: Vegetable) =>
  stores.filter((s) => veg.storeIds.includes(s.id)).sort((a, b) => a.distanceKm - b.distanceKm);
export const getRecipesFor = (vegId: string) => recipes.filter((r) => r.vegetableIds.includes(vegId));
