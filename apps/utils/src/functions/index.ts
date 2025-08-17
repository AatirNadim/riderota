const generateSlugFromName = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

export { generateSlugFromName };
