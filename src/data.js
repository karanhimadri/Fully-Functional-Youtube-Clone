export const API_KEY = "AIzaSyCFvedmHwGUe3ZM-GFPfFhR6wNwZ_J0nMY";

export const ViewsModifier = (views) => {
  if (views > 1000000) {
    return Math.floor(views / 1000000) + "M";
  } else if (views >= 1000) {
    return Math.floor(views / 1000) + "K";
  } else {
    return views;
  }
};
