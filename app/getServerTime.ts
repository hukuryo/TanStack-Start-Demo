import { createServerFn } from "@tanstack/react-start";

import { z } from "zod";

const Person = z.object({
  name: z.string(),
});

export const greet = createServerFn({ method: "GET" })
  .validator((person: unknown) => {
    return Person.parse(person);
  })
  .handler(async (ctx) => {
    return `Hello, ${ctx.data.name}!`;
  });

greet({
  data: {
    name: "John",
  },
});
