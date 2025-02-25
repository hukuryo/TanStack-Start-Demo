import { createServerFn } from "@tanstack/react-start";

export const greetUser = createServerFn({ method: "POST" })
  .validator((data) => {
    if (!(data instanceof FormData)) {
      throw new Error("Invalid form data");
    }
    const name = data.get("name");
    const age = data.get("age");

    if (!name || !age) {
      throw new Error("Name and age are required");
    }

    return {
      name: name.toString(),
      age: parseInt(age.toString(), 10),
    };
  })
  .handler(async ({ data: { name, age } }) => {
    return `Hello, ${name}! You are ${age} years old.`;
  });

// Usage
export function Form() {
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await greetUser({ data: formData });
        console.log(response);
      }}
    >
      <input name="name" />
      <input name="age" />
      <button type="submit">Submit</button>
    </form>
  );
}
