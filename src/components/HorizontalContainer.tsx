const HorizontalContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <div className="max-w-screen-md mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
    {children}
  </div>
);

export default HorizontalContainer;
