import { buildCollection, buildProperty, EntityReference } from "firecms";
import { localeCollection } from "./locales.tsx";

export type Product = {
    title: string,
    subtitle: string,
    image: string,
    price: number,
    tags: string[],
    description: string,
    categories: string[],
    url: string
}

export const productsCollection = buildCollection<Product>({
    name: "Products",
    singularName: "Product",
    path: "products",
    icon: "LocalGroceryStore",
    group: "E-commerce",
    permissions: ({ authController, user }) => {
        const isAdmin = authController.user?.email?.includes('@blazed.space');
        return ({
            read: true,
            edit: isAdmin,
            create: isAdmin,
            delete: isAdmin
        })
    },
    subcollections: [
        localeCollection
    ],
    properties: {
        title: {
            name: "Title",
            validation: { required: true },
            dataType: "string"
        },
        subtitle: {
            name: "Subtitle",
            validation: { required: true },
            dataType: "string"
        },
        image: buildProperty({ // The `buildProperty` method is a utility function used for type checking
            name: "Image",
            description: "Product image.",
            dataType: "string",
            validation: { required: false },
            storage: {
                storagePath: "images/products",
                acceptedFiles: ["image/*"]
            }
        }),
        price: {
            dataType: "number",
            description: "Price of the product.",
            validation: {
                required: false,
                moreThan: 0,
                positive: true,
                min: 0,
                integer: false
            }
        },
       /*
        text: {
            dataType: "string",
            name: "Text",
            markdown: true
        },
        */
        tags: {
            name: "Tags",
            description: "Tags help users find products by treating them like keywords.",
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
            longDescription: "Here you can explain the product, or if its an electronic, include its specs.",
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
                    software: "Software",
                    clothing: "Clothing",
                    accessories: "Accessories",
                    other: "Other",
                }
            }
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
        url: {
            name: "URL",
            description: "The link to the product.",
            validation: { required: true },
            dataType: "string"
        },
    }
});
