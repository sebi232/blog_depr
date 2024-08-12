import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";

import { webpackBundler } from "@payloadcms/bundler-webpack";

import { lexicalEditor } from "@payloadcms/richtext-lexical"; // beta

export default buildConfig({
  admin: {
    bundler: webpackBundler(), // or viteBundler()
  },
  db: mongooseAdapter({
    url: process.env.MONGO_URL as string,
  }), // or postgresAdapter({}),
  editor: lexicalEditor({}), // or slateEditor({})
  collections: [
    {
      slug: "pages",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "content",
          type: "richText",
          required: true,
        },
      ],
    },
  ],
  globals: [
    {
      slug: "header",
      fields: [
        {
          name: "nav",
          type: "array",
          fields: [
            {
              name: "page",
              type: "relationship",
              relationTo: "pages",
            },
          ],
        },
      ],
    },
  ],
});
