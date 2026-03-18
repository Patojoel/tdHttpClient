import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createTestStore } from "@/config/create-store";
import { Dependencies } from "@/config/dependencies";

interface AllTheProvidersProps {
  children: React.ReactNode;
  store: any;
}

const AllTheProviders = ({ children, store }: AllTheProvidersProps) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  {
    preloadedState = {},
    dependencies = {},
    ...renderOptions
  }: {
    preloadedState?: any;
    dependencies?: Partial<Dependencies>;
  } & Omit<RenderOptions, "wrapper"> = {}
) => {
  const store = createTestStore(dependencies, preloadedState);
  return {
    ...render(ui, {
      wrapper: (props) => <AllTheProviders {...props} store={store} />,
      ...renderOptions,
    }),
    store,
  };
};

export * from "@testing-library/react";
export { customRender as renderWithProviders };
