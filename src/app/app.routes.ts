import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "pokedex",
    loadComponent: () =>
      import("./pokedex/pokedex.page").then((m) => m.PokedexPage),
  },
  {
    path: "",
    redirectTo: "pokedex",
    pathMatch: "full",
  },
];
