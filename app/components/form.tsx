import { createServerFn } from "@tanstack/react-start";

export const yourFn = createServerFn({ method: "POST" })
  .validator((formData: FormData) => {
    if (!(formData instanceof FormData)) {
      throw new Error("Invalid form data");
    }

    const name = formData.get("name");
    console.log(name);

    if (!name) {
      throw new Error("Name is required");
    }

    return name;
  })
  .handler(async ({ data: name }) => {
    console.log(name); // 'John'
  });

export function Form() {
  return (
    <form action={yourFn.url} method="POST">
      <input name="name" defaultValue="John" />
      <button type="submit">Click me!</button>
    </form>
  );
}
