import React from "react";
import { render, fireEvent, waitFor, getByRole } from "@testing-library/react";
import Form from "pages/form/index";
import { BACKEND_URL_API, ROUTER } from "constants/constants";

const inputs = [
  { label: "Full Name", value: "John Smith" },
  { label: "Email", value: "john@example.com" },
  { label: "Password", value: "abc123" },
];

const inputLabels = inputs.map((inp) => inp.label);

describe("Form", () => {
  it("should render the form", () => {
    const { getByLabelText } = render(<Form serverData={[]} />);

    inputLabels.forEach((label) => {
      expect(getByLabelText(label)).toBeDefined();
    });
  });

  it("should update the form state when the inputs are changed", () => {
    const { getByLabelText } = render(<Form serverData={[]} />);

    inputs.forEach((input) => {
      const element = getByLabelText(input.label);
      fireEvent.change(element, { target: { value: input.value } });
      expect((element as HTMLInputElement).value).toBe(input.value);
    });
  });

  it("should submit the form and display spinner on loading", async () => {
    jest.useFakeTimers();
    const mockSubmit = jest.fn(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("");
        }, 3000);
      });
    });

    const { getByRole, findByTestId } = render(
      <Form serverData={[]} submitForm={mockSubmit} />
    );

    const submitButton = getByRole("button");

    fireEvent.click(submitButton);
    jest.advanceTimersByTime(2000); // Wait for 2 seconds to allow the spinner to be rendered
    const spinner = await findByTestId("jest");
    expect(spinner).not.toBeNull();
  });
});
