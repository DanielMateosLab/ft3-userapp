const HorizontalContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <div className="min-h-screen bg-gray-100">
    <div className="max-w-screen-md mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
      {children}
    </div>
  </div>
);

export default HorizontalContainer;
