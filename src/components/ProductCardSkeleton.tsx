export const ProductCardSkeleton = () => {
  return (
    <div className="block animate-pulse">
      {/* Image skeleton */}
      <div className="relative overflow-hidden bg-muted aspect-[3/4]">
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-shimmer" />
        
        {/* Price tag skeleton */}
        <div className="absolute top-4 left-4 bg-background/50 h-7 w-16" />
      </div>
      
      {/* Product info skeleton */}
      <div className="mt-4">
        <div className="h-4 bg-muted w-3/4" />
      </div>
    </div>
  );
};