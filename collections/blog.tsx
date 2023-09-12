import { buildCollection, buildProperty, EntityReference } from "firecms";
import { localeCollection } from "./locales.tsx";

export type Post = {
    title: string,
    description: string,
    tags: string[],
    text: string,
    categories: string[],
    created_on: Date,
}

export const blogCollection = buildCollection<Post>({
    name: "Posts",
    singularName: "Post",
    path: "posts",
    icon: "RssFeed",
    group: "Blog",
    permissions: ({ authController, user }) => ({
        read: true,
        edit: true,
        create: true,
        delete: true
    }),
    subcollections: [
        localeCollection
    ],
    properties: {
        title: {
            name: "Title",
            validation: { required: true },
            dataType: "string"
        },
        /*
        main_image: buildProperty({ // The `buildProperty` method is a utility function used for type checking
            name: "Image",
            dataType: "string",
            storage: {
                storagePath: "images",
                acceptedFiles: ["image/*"]
            }
        }),
        */
        text: {
            dataType: "string",
            name: "Text",
            markdown: true
        },
        tags: {
            name: "Tags",
            description: "Example of generic array",
            validation: { required: true },
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
        description: {
            name: "Description",
            description: "This is the description of the product",
            multiline: true,
            longDescription: "Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros.",
            dataType: "string",
            columnWidth: 300
        },
        categories: {
            name: "Categories",
            validation: { required: true },
            dataType: "array",
            of: {
                dataType: "string",
                enumValues: {
                    electronics: "Electronics",
                    books: "Books",
                    furniture: "Furniture",
                    clothing: "Clothing",
                    food: "Food",
                    footwear: "Footwear",
                }
            }
        },
        created_on: {
            name: "Created on",
            dataType: "date",
            autoValue: "on_create"
        },
        /*
        publisher: {
            name: "Publisher",
            description: "This is an example of a map property",
            dataType: "map",
            properties: {
                name: {
                    name: "Name",
                    dataType: "string"
                },
                external_id: {
                    name: "External id",
                    dataType: "string"
                }
            }
        },
        metadata: {
            name: "Metadata",
            dataType: "map",
            keyValue: true
        },
        expires_on: {
            name: "Expires on",
            dataType: "date"
        }
        */
    }
});