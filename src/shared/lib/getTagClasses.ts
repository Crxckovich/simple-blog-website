export const getTagClasses = (isSelected: boolean, isAllTag: boolean, hasSelectedTag: boolean) => {
  switch (true) {
    case isSelected:
      return "bg-sky-500";
    case isAllTag:
      return "bg-sky-300/30 hover:bg-sky-300/50 text-sky-900";
    case hasSelectedTag:
      return "bg-primary/10 text-primary hover:bg-sky-300/50 hover:text-sky-900";
    default:
      return "bg-primary/10 text-primary hover:bg-sky-300/50 hover:text-sky-900";
  }
};
