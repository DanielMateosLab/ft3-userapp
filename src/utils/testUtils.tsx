import { UserContext } from "@/services/user";
import { UserWithoutPassword } from "@/types/user";
import { RenderOptions, render } from "@testing-library/react";
import { FC, PropsWithChildren, ReactElement } from "react";

const mockSetUser = jest.fn();

interface InitialValues {
  user?: UserWithoutPassword;
}

const AllTheProviders: FC<PropsWithChildren<InitialValues>> = ({
  children,
  user,
}) => (
  <UserContext.Provider value={{ user, setUser: mockSetUser }}>
    {children}
  </UserContext.Provider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { initialValues?: InitialValues },
) => {
  const result = render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders {...options?.initialValues}>{children}</AllTheProviders>
    ),
    ...options,
  });

  return { ...result, mockSetUser };
};

export { customRender as render };
