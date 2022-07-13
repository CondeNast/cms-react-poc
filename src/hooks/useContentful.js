
import { createClient } from "contentful";

const useContentful = () => {
  const client = createClient({
    space: "n44h4t2tol9c",
    accessToken: "iBMOctUq4D7IBjmtD-qfd6CzNmTHnCDRJVt5G1uaa4w",
  });
  const getBlog = async () => {
    try {
      const entries = await client.getEntries({
        content_type: "blog",
        select: "fields",
      });

      const sanitizedEntries = entries.items.map((item) => {
        return {
          ...item.fields,
        };
      });

      return sanitizedEntries;
    } catch (error) {
      console.log(`${error}`);
    }
  };

  const getCategories = async () => {
    try {
      const entries = await client.getEntries({
        content_type: "category",
        select: "fields",
      });
      const sanitizedEntries = entries.items.map((item) => {
        return {
          ...item.fields,
        };
      });

      return sanitizedEntries;
    } catch (error) {
      console.log(`${error}`);
    }
  };
  return { getBlog, getCategories };
};
export default useContentful;