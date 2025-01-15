const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white/80">
      <div className="relative w-16 h-16">
        <div className="absolute w-16 h-16 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute w-16 h-16 border-4 border-secondary rounded-full border-b-transparent animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
